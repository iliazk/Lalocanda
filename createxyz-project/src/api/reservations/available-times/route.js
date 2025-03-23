async function handler({ date }) {
  if (!date) {
    return { error: "Date is required" };
  }

  try {
    const reservations = await sql`
      SELECT reservation_time, end_time 
      FROM reservations 
      WHERE reservation_date = ${date}::date
    `;

    const availableTimes = [];
    const timeSlots = [
      "11:00:00",
      "12:00:00",
      "13:00:00",
      "14:00:00",
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "20:00:00",
      "21:00:00",
    ];

    for (const timeSlot of timeSlots) {
      const timeToCheck = new Date(`${date}T${timeSlot}`);
      const slotEnd = new Date(timeToCheck.getTime() + 2 * 60 * 60 * 1000);

      const isOverlapping = reservations.some((reservation) => {
        const reservationStart = new Date(
          `${date}T${reservation.reservation_time}`
        );
        const reservationEnd = new Date(`${date}T${reservation.end_time}`);

        return (
          (timeToCheck >= reservationStart && timeToCheck < reservationEnd) ||
          (slotEnd > reservationStart && slotEnd <= reservationEnd)
        );
      });

      if (!isOverlapping) {
        availableTimes.push(timeSlot);
      }
    }

    return { availableTimes };
  } catch (error) {
    return { error: "Failed to get available times" };
  }
}