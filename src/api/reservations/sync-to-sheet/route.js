async function handler({ reservation_id }) {
  if (!reservation_id) {
    return { error: "Reservation ID required" };
  }

  try {
    const [reservation] = await sql`
      SELECT * FROM reservations 
      WHERE id = ${reservation_id}
    `;

    if (!reservation) {
      return { error: "Reservation not found" };
    }

    const sheetData = {
      date: reservation.reservation_date,
      time: reservation.reservation_time,
      name: reservation.customer_name,
      email: reservation.customer_email,
      phone: reservation.phone,
      guests: reservation.guests,
      status: reservation.status,
      table: reservation.table_number,
    };

    const sheetUrl = process.env.RESERVATION_SHEET_URL;
    const response = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetData),
    });

    if (!response.ok) {
      throw new Error("Failed to sync with sheet");
    }

    const data = await response.json();

    await sql`
      UPDATE reservations 
      SET sheet_id = ${data.id}
      WHERE id = ${reservation_id}
    `;

    return { success: true };
  } catch (error) {
    console.error("Sheet sync error:", error);
    return { error: "Failed to sync with sheet" };
  }
}