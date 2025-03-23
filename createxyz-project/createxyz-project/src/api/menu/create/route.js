async function handler({
  category,
  name,
  description,
  price,
  menu_type,
  drink_type,
}) {
  if (!category || !name || !menu_type) {
    return { error: "Missing required fields" };
  }

  try {
    const result = await sql`
      INSERT INTO menu_items (
        category, 
        name, 
        description, 
        price, 
        menu_type, 
        drink_type
      ) 
      VALUES (
        ${category}, 
        ${name}, 
        ${description}, 
        ${price}, 
        ${menu_type}, 
        ${drink_type}
      )
      RETURNING *
    `;

    return { item: result[0] };
  } catch (error) {
    if (error.code === "23505") {
      return {
        error: "A menu item with this name and menu type already exists",
      };
    }
    return { error: "Failed to create menu item" };
  }
}