async function handler() {
  try {
    await fetch("/api/send-reservation-email", {
      method: "POST",
      body: JSON.stringify({
        to: "iliazk@protonmail.com",
        subject: "La Locanda - Test Email",
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Test Email</h2>
            <p>This is a test email from La Locanda reservation system.</p>
            <p>If you received this email, the email system is working correctly.</p>
          </div>
        `,
      }),
    });

    return { success: true, message: "Test email sent" };
  } catch (error) {
    console.error("Test email failed:", error);
    return { error: JSON.stringify(error) };
  }
}