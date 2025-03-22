async function handler({ reservation_id, email }) {
  if (!reservation_id || !email) {
    return { error: "Reservation ID and email required" };
  }

  try {
    const [reservation] = await sql`
      SELECT * FROM reservations 
      WHERE id = ${reservation_id} 
      AND customer_email = ${email}
      AND status = 'confirmed'
    `;

    if (!reservation) {
      return { error: "Reservation not found or already cancelled" };
    }

    await sql`
      UPDATE reservations 
      SET status = 'cancelled' 
      WHERE id = ${reservation_id}
    `;

    await fetch("/api/sync-reservation-to-sheet", {
      method: "POST",
      body: JSON.stringify({ reservation_id }),
    });

    return { success: true };
  } catch (error) {
    console.error("Cancel reservation error:", error);
    return { error: "Failed to cancel reservation" };
  }
}