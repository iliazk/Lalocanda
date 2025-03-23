async function handler({ message, conversationId }) {
  if (!message) {
    return { error: "Message is required" };
  }

  try {
    const systemPrompt = `You are a helpful assistant for La Locanda restaurant website. 
    You can help with:
    - Restaurant information and features
    - Making reservations
    - Menu items and prices
    - Contact information
    - Opening hours
    Keep responses concise and friendly. If users need to make a reservation, direct them to the reservations page.`;

    const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices?.[0]?.message) {
      throw new Error("Failed to get response from ChatGPT");
    }

    const menuItems = await sql`
      SELECT name, price, description, menu_type 
      FROM menu_items 
      ORDER BY menu_type, name`;

    const reservations = await sql`
      SELECT COUNT(*) as count 
      FROM reservations 
      WHERE reservation_date = CURRENT_DATE`;

    const chatResponse = data.choices[0].message.content;

    return {
      response: chatResponse,
      menuCount: menuItems.length,
      reservationsToday: reservations[0].count,
    };
  } catch (error) {
    console.error("Chatbot error:", error);
    return {
      error:
        "Sorry, I'm having trouble responding right now. Please try again later.",
    };
  }
}