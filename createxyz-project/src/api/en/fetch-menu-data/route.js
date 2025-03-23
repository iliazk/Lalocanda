async function handler() {
  try {
    const [lunchItems, alacarteItems, drinkItems] = await sql.transaction([
      sql`SELECT * FROM menu_items WHERE menu_type = 'lunch' ORDER BY category, name`,
      sql`SELECT * FROM menu_items WHERE menu_type = 'alacarte' ORDER BY category, name`,
      sql`SELECT * FROM menu_items WHERE menu_type = 'drinks' ORDER BY category, name`,
    ]);

    return {
      success: true,
      lunch: lunchItems,
      alacarte: alacarteItems,
      drinks: drinkItems,
    };
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return {
      success: false,
      error: "Failed to fetch menu data",
    };
  }
}