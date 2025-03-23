async function handler(body) {
  const session = getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const { date } = body;
  if (!date) {
    return { error: "Date is required" };
  }

  const searchDate = new Date(date).toISOString().split("T")[0];

  try {
    const rows = await sql`
      SELECT 
        id,
        table_number,
        reservation_date,
        reservation_time,
        end_time,
        customer_name,
        customer_email,
        phone,
        guests as party_size,
        status,
        sheet_id,
        notification_sent
      FROM reservations 
      WHERE reservation_date = ${searchDate}
      ORDER BY reservation_time ASC
    `;

    const reservations = rows.map((row) => ({
      ...row,
      reservation_time: row.reservation_time.toString().slice(0, 5),
      end_time: row.end_time.toString().slice(0, 5),
    }));

    return {
      reservations,
    };
  } catch (error) {
    console.error("Get reservations error:", error);
    return { error: "Failed to fetch reservations" };
  }
}