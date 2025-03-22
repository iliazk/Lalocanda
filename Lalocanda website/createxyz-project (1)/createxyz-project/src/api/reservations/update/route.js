async function handler({
  reservation_id,
  email,
  new_date,
  new_time,
  new_guests,
  status,
}) {
  if (!reservation_id || (!email && !status)) {
    return { error: "Reservation ID and either email or status required" };
  }

  try {
    // Verify reservation exists
    const [reservation] = await sql`
      SELECT * FROM reservations 
      WHERE id = ${reservation_id} 
      AND (${email}::text IS NULL OR customer_email = ${email})
      AND (${status}::text IS NULL OR status = 'confirmed')
    `;

    if (!reservation) {
      return { error: "Reservation not found or already cancelled" };
    }

    // If only updating status
    if (status && !new_date && !new_time && !new_guests) {
      const [updatedReservation] = await sql`
        UPDATE reservations 
        SET status = ${status}
        WHERE id = ${reservation_id}
        RETURNING *
      `;
      return { reservation: updatedReservation };
    }

    // If changing date/time, check availability
    if (new_date || new_time) {
      const checkDate = new_date || reservation.reservation_date;
      const checkTime = new_time || reservation.reservation_time;

      const conflicts = await sql`
        SELECT table_number 
        FROM reservations
        WHERE reservation_date = ${checkDate}::date
        AND status = 'confirmed'
        AND id != ${reservation_id}
        AND reservation_time <= ${checkTime}::time
        AND end_time > ${checkTime}::time
      `;

      const usedTables = new Set(conflicts.map((r) => r.table_number));
      let finalTable = reservation.table_number;

      if (usedTables.has(finalTable)) {
        for (let i = 1; i <= 10; i++) {
          if (!usedTables.has(i)) {
            finalTable = i;
            break;
          }
        }

        if (finalTable === reservation.table_number) {
          return { error: "No tables available for requested time" };
        }
      }

      // Calculate new end time if time changed
      let end_time = reservation.end_time;
      if (new_time) {
        const startTime = new Date(`2000-01-01 ${new_time}`);
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
        end_time = endTime.toTimeString().split(" ")[0];
      }

      const [updatedReservation] = await sql`
        UPDATE reservations 
        SET 
          reservation_date = COALESCE(${new_date}::date, reservation_date),
          reservation_time = COALESCE(${new_time}::time, reservation_time),
          end_time = COALESCE(${end_time}::time, end_time),
          guests = COALESCE(${new_guests}, guests),
          table_number = ${finalTable}
        WHERE id = ${reservation_id}
        RETURNING *
      `;

      // Sync and send confirmation
      await fetch("/api/sync-reservation-to-sheet", {
        method: "POST",
        body: JSON.stringify({ reservation_id }),
      });

      await fetch("/api/send-reservation-confirmation", {
        method: "POST",
        body: JSON.stringify({
          reservation_id,
          email: reservation.customer_email,
          name: reservation.customer_name,
          date: new_date || reservation.reservation_date,
          time: new_time || reservation.reservation_time,
          guests: new_guests || reservation.guests,
          table: finalTable,
        }),
      });

      return { reservation: updatedReservation };
    }

    return { success: true };
  } catch (error) {
    console.error("Update reservation error:", error);
    return { error: "Failed to update reservation" };
  }
}