async function handler(request) {
  let body;
  try {
    body =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body;
  } catch (error) {
    return { error: "Invalid request format" };
  }

  if (!body) {
    return { error: "No request body provided" };
  }

  const reservation = {
    customer_name: body.customerName || body.customer_name || "",
    customer_email: body.email || body.customer_email || "",
    phone: body.phone || "",
    reservation_date: body.date || body.reservation_date || "",
    reservation_time: body.time || body.reservation_time || "",
    guests: parseInt(body.guests) || 0,
    sheet_id: body.sheet_id || null,
  };

  if (!reservation.customer_name) return { error: "Name is required" };
  if (!reservation.customer_email) return { error: "Email is required" };
  if (!reservation.phone) return { error: "Phone is required" };
  if (!reservation.reservation_date) return { error: "Date is required" };
  if (!reservation.reservation_time) return { error: "Time is required" };
  if (!reservation.guests || reservation.guests < 1)
    return { error: "Valid number of guests is required" };

  const hour = parseInt(reservation.reservation_time.split(":")[0]);
  if (hour < 11 || hour >= 22) {
    return { error: "Restaurant is only open from 11:00 to 22:00" };
  }

  try {
    const availabilityCheck = await sql(
      "SELECT COUNT(*) FROM reservations WHERE reservation_date = $1::date AND reservation_time = $2::time",
      [reservation.reservation_date, reservation.reservation_time]
    );

    if (availabilityCheck[0].count >= 50) {
      return { error: "No tables available for selected time" };
    }

    const takenTables = await sql(
      "SELECT table_number FROM reservations WHERE reservation_date = $1::date AND reservation_time = $2::time AND status != $3 ORDER BY table_number",
      [reservation.reservation_date, reservation.reservation_time, "cancelled"]
    );

    const tableNumber = findFirstAvailableTable(
      takenTables.map((r) => r.table_number)
    );

    const result = await sql(
      "INSERT INTO reservations (table_number, reservation_date, reservation_time, end_time, customer_name, customer_email, phone, guests, status, sheet_id) VALUES ($1, $2::date, $3::time, $3::time + interval '2 hours', $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        tableNumber,
        reservation.reservation_date,
        reservation.reservation_time,
        reservation.customer_name,
        reservation.customer_email,
        reservation.phone,
        reservation.guests,
        "confirmed",
        reservation.sheet_id,
      ]
    );

    try {
      await fetch("/api/send-reservation-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result[0]),
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return {
      success: true,
      message: "Reservation created successfully",
      reservation: result[0],
    };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Failed to create reservation: " + error.message };
  }
}

function findFirstAvailableTable(takenTables) {
  let tableNumber = 1;
  while (takenTables.includes(tableNumber)) {
    tableNumber++;
  }
  return tableNumber;
}