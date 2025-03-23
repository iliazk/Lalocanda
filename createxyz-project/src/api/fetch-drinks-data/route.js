async function handler() {
  try {
    const drinks = await sql`
      SELECT name, category, price, description, drink_type
      FROM menu_items 
      WHERE menu_type = 'JUOMALISTA'
      ORDER BY category, name
    `;

    if (!drinks?.length) {
      return {
        error: "No drinks found",
      };
    }

    const organizedDrinks = drinks.reduce((acc, drink) => {
      const category = drink.drink_type || "Other";

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push({
        name: drink.name,
        price: Number(drink.price),
        description: drink.description,
        category: drink.category,
      });

      return acc;
    }, {});

    return {
      drinks: organizedDrinks,
    };
  } catch (error) {
    return {
      error: "Failed to fetch drinks menu",
    };
  }
}