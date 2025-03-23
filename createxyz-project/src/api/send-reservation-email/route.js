async function handler({ to, subject, html }) {
  if (!to || !subject || !html) {
    return { error: "Missing required fields" };
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "info@lalocandavantaa.fi",
        to,
        subject,
        html,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { error: "Failed to send email" };
  }
}