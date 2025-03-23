async function handler({ menu_type, category }) {
  try {
    let queryStr = "SELECT * FROM menu_items";
    const values = [];
    const conditions = [];
    let paramCount = 1;

    if (menu_type) {
      conditions.push(`menu_type = $${paramCount}`);
      values.push(menu_type);
      paramCount++;
    }

    if (category) {
      conditions.push(`category = $${paramCount}`);
      values.push(category);
      paramCount++;
    }

    if (conditions.length > 0) {
      queryStr += ` WHERE ${conditions.join(" AND ")}`;
    }

    queryStr += " ORDER BY category, name";

    const items = await sql(queryStr, values);
    return { items };
  } catch (error) {
    return { error: "Failed to fetch menu items" };
  }
}