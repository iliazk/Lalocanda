async function handler({
  reservation_id,
  email,
  name,
  date,
  time,
  guests,
  table,
}) {
  if (
    !reservation_id ||
    !email ||
    !name ||
    !date ||
    !time ||
    !guests ||
    !table
  ) {
    return { error: "Missing required fields" };
  }

  try {
    const formattedDate = new Date(date).toLocaleDateString("en-GB");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e4a00e;">La Locanda - Reservation Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Your reservation has been confirmed with the following details:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Reservation ID:</strong> ${reservation_id}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Number of Guests:</strong> ${guests}</p>
          <p><strong>Table Number:</strong> ${table}</p>
        </div>
        <p>If you need to modify your reservation, please visit our website and use your email and reservation ID.</p>
        <p>Thank you for choosing La Locanda!</p>
        <p style="font-size: 12px; color: #666;">Note: Your reservation details will be automatically removed two hours after your reservation ends.</p>
      </div>
    `;

    await fetch("/api/send-reservation-email", {
      method: "POST",
      body: JSON.stringify({
        to: email,
        subject: "La Locanda - Reservation Confirmation",
        html: emailHtml,
      }),
    });

    await sql`
      UPDATE reservations 
      SET notification_sent = true 
      WHERE id = ${reservation_id}
    `;

    return { success: true };
  } catch (error) {
    console.error("Failed to send confirmation:", error);
    return { error: "Failed to send confirmation email" };
  }
}