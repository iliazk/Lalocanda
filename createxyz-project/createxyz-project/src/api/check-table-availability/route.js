async function handler({ date, time }) {
  if (!date || !time) {
    return { error: "Date and time are required" };
  }

  const openingHour = 11;
  const closingHour = 22;

  const requestedHour = parseInt(time.split(":")[0]);
  if (requestedHour < openingHour || requestedHour >= closingHour) {
    return {
      error: `Restaurant is only open from ${openingHour}:00 to ${closingHour}:00`,
    };
  }

  try {
    const reservations = await sql`
      SELECT table_number 
      FROM reservations 
      WHERE reservation_date = ${date}::date 
      AND reservation_time = ${time}::time
      AND status != 'cancelled'
    `;

    const takenTables = reservations.map((r) => r.table_number);
    const allTables = Array.from({ length: 50 }, (_, i) => i + 1);

    return {
      available: allTables.filter((t) => !takenTables.includes(t)),
      taken: takenTables,
    };
  } catch (error) {
    return { error: "Failed to check table availability" };
  }
}