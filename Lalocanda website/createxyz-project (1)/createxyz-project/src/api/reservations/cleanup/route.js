async function handler() {
  try {
    // Get expired reservations
    const expiredReservations = await sql`
      SELECT id 
      FROM reservations 
      WHERE reservation_date <= CURRENT_DATE 
      AND end_time <= (CURRENT_TIME - INTERVAL '2 hours')
      AND status = 'confirmed'
    `;

    if (!expiredReservations.length) {
      return { message: "No reservations to cleanup" };
    }

    const ids = expiredReservations.map((r) => r.id);

    // Anonymize and mark as completed
    await sql`
      UPDATE reservations 
      SET 
        status = 'completed',
        customer_name = 'Anonymous',
        customer_email = NULL,
        phone = NULL,
        notification_sent = false
      WHERE id = ANY(${ids})
    `;

    // Sync each reservation
    for (const res of expiredReservations) {
      await fetch("/api/sync-reservation-to-sheet", {
        method: "POST",
        body: JSON.stringify({ reservation_id: res.id }),
      });
    }

    return {
      success: true,
      cleaned: expiredReservations.length,
    };
  } catch (error) {
    return { error: "Failed to cleanup reservations" };
  }
}