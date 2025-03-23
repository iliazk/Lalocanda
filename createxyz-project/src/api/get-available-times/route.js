async function handler({ date }) {
  if (!date) {
    return { error: "Date is required" };
  }

  const reservations = await sql`
    SELECT table_number, reservation_time, end_time
    FROM reservations 
    WHERE reservation_date = ${date}::date
    AND status = 'confirmed'
  `;

  const times = [];
  for (let hour = 11; hour <= 21; hour++) {
    const time = `${hour.toString().padStart(2, "0")}:00`;

    const conflictingReservations = reservations.filter((r) => {
      const resTime = r.reservation_time;
      const endTime = r.end_time;
      return time >= resTime && time < endTime;
    });

    const availableTables = 50 - conflictingReservations.length;

    if (availableTables > 0) {
      times.push({
        time,
        availableTables,
      });
    }
  }

  return { times };
}