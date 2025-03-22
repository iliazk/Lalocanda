async function handler() {
  try {
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Europe/Helsinki",
    });

    const reservations = await sql(
      "SELECT *, COALESCE(total_amount, 0) as total_amount FROM reservations WHERE reservation_date = $1 ORDER BY reservation_time ASC",
      [today]
    );

    return {
      success: true,
      reservations,
    };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Failed to fetch today's reservations" };
  }
}