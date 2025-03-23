async function handler({ reservationId, testMode }) {
  if (!reservationId && !testMode) {
    return { error: "Reservation ID is required" };
  }

  try {
    let reservation;

    if (!testMode) {
      [reservation] = await sql(
        "SELECT * FROM reservations WHERE id = $1 AND notification_sent = false",
        [reservationId]
      );

      if (!reservation) {
        return { error: "Reservation not found or notification already sent" };
      }
    }

    const formattedTime = testMode
      ? "12:00"
      : reservation.reservation_time.slice(0, 5);
    const [hours, minutes] = formattedTime.split(":");
    const endHours = (parseInt(hours) + 2).toString().padStart(2, "0");
    const endTime = `${endHours}:${minutes}`;

    const formattedDate = testMode
      ? new Date().toLocaleDateString("fi-FI", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date(reservation.reservation_date).toLocaleDateString("fi-FI", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f5ae15; color: #000; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .details { margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #666; }
            ${
              testMode
                ? ".test-mode { background-color: #ff000020; padding: 10px; text-align: center; }"
                : ""
            }
          </style>
        </head>
        <body>
          <div class="container">
            ${
              testMode
                ? '<div class="test-mode">TEST MODE - This is a test email</div>'
                : ""
            }
            <div class="header">
              <h1>Varausvahvistus - La Locanda</h1>
            </div>
            <div class="content">
              <p>Hei ${testMode ? "Test User" : reservation.customer_name},</p>
              <p>Kiitos varauksestasi! Tässä vahvistus pöytävarauksellesi:</p>
              
              <div class="details">
                <p><strong>Päivämäärä:</strong> ${formattedDate}</p>
                <p><strong>Aika:</strong> ${formattedTime} - ${endTime}</p>
                <p><strong>Henkilömäärä:</strong> ${
                  testMode ? 2 : reservation.guests
                }</p>
                <p><strong>Pöytänumero:</strong> ${
                  testMode ? 1 : reservation.table_number
                }</p>
              </div>

              <p><strong>Tärkeää huomioitavaa:</strong></p>
              <ul>
                <li>Varauksen kesto on 2 tuntia</li>
                <li>Peruutukset viimeistään 24h ennen varausta</li>
                <li>Jos sinulla on kysyttävää tai haluat muuttaa varausta, ota yhteyttä:</li>
              </ul>

              <div class="contact">
                <p>Puhelin: +358 50 549 5607</p>
                <p>Sähköposti: info@lalocanda.fi</p>
                <p>Osoite: Maitikkakuja 1, 01350 Vantaa</p>
              </div>
            </div>
            
            <div class="footer">
              <p>Tervetuloa ravintolaamme!</p>
              <p>La Locanda</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "La Locanda <varaukset@lalocanda.fi>",
        to: testMode ? "test@example.com" : reservation.customer_email,
        subject: testMode
          ? "[TEST] Varausvahvistus - La Locanda"
          : "Varausvahvistus - La Locanda",
        html: htmlContent,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error("Failed to send email");
    }

    if (!testMode) {
      await sql(
        "UPDATE reservations SET notification_sent = true WHERE id = $1",
        [reservationId]
      );
    }

    return {
      success: true,
      testMode: testMode || false,
    };
  } catch (error) {
    return { error: "Failed to process reservation confirmation" };
  }
}