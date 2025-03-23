async function handler({
  date,
  time,
  name,
  email,
  tableNumber,
  phone,
  guests,
  testMode,
}) {
  const requiredFields = {
    date,
    time,
    name,
    email,
    tableNumber,
    phone,
    guests,
  };
  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([field]) => field);

  if (missingFields.length > 0) {
    return { error: `Missing required fields: ${missingFields.join(", ")}` };
  }

  if (isNaN(guests) || guests < 1 || guests > 10) {
    return { error: "Number of guests must be between 1 and 10" };
  }

  const [hours, minutes] = time.split(":");
  const endHours = (parseInt(hours) + 2).toString().padStart(2, "0");
  const endTime = `${endHours}:${minutes}:00`;

  try {
    let newReservation = null;

    if (!testMode) {
      const checkAvailability = await sql`
        SELECT 1 FROM reservations 
        WHERE table_number = ${tableNumber} 
        AND reservation_date = ${date}::date 
        AND ((reservation_time <= ${time}::time AND end_time > ${time}::time) 
        OR (reservation_time < ${endTime}::time AND end_time >= ${endTime}::time)) 
        LIMIT 1
      `;

      if (checkAvailability.length > 0) {
        return { error: "Table not available for this time slot" };
      }

      const [insertedReservation] = await sql`
        INSERT INTO reservations 
        (table_number, reservation_date, reservation_time, end_time, customer_name, 
        customer_email, phone, guests, status, notification_sent) 
        VALUES 
        (${tableNumber}, ${date}::date, ${time}::time, ${endTime}::time, 
        ${name.trim()}, ${email.trim().toLowerCase()}, ${phone}, ${guests}, 
        'confirmed', false) 
        RETURNING *
      `;

      newReservation = insertedReservation;
    }

    try {
      const emailResponse = await fetch("/api/send-reservation-email", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          date,
          time,
          guests,
          tableNumber,
          testMode,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send confirmation email");
      }

      const emailResult = await emailResponse.json();

      if (emailResult.error) {
        throw new Error(emailResult.error);
      }

      if (!testMode && newReservation) {
        await sql`
          UPDATE reservations 
          SET notification_sent = true 
          WHERE id = ${newReservation.id}
        `;
      }

      return {
        success: true,
        reservation: testMode ? null : newReservation,
        emailSent: true,
        testMode,
      };
    } catch (emailError) {
      console.error("Email sending failed:", emailError);

      return {
        success: true,
        reservation: testMode ? null : newReservation,
        emailSent: false,
        warning:
          "Reservation confirmed but confirmation email could not be sent",
        testMode,
      };
    }
  } catch (error) {
    if (error.code === "23514") {
      return { error: "Invalid guest count or reservation time" };
    }
    if (error.code === "23505") {
      return { error: "This table is already reserved for the selected time" };
    }
    console.error("Reservation creation failed:", error);
    return { error: "Failed to create reservation. Please try again later." };
  }
}