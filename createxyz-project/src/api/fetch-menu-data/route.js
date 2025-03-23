async function handler() {
  try {
    // Get menu items with menu_type filtering
    const [lunch, alacarte, drinks] = await sql.transaction([
      sql`
        SELECT category, name, description, price
        FROM menu_items 
        WHERE menu_type = 'lunch'
        ORDER BY category, name
      `,
      sql`
        SELECT category, name, description, price
        FROM menu_items 
        WHERE menu_type = 'alacarte'
        ORDER BY category, name
      `,
      sql`
        SELECT category, name, description, price, drink_type
        FROM menu_items 
        WHERE menu_type = 'drinks'
        ORDER BY category, name
      `,
    ]);

    return {
      lunch,
      alacarte,
      drinks,
    };
  } catch (error) {
    return {
      error: "Failed to fetch menu data",
    };
  }
}