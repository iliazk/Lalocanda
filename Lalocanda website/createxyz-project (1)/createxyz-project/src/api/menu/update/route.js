async function handler({
  id,
  category,
  name,
  description,
  price,
  menu_type,
  drink_type,
}) {
  if (!id) {
    return { error: "Menu item ID is required" };
  }

  try {
    const updates = [];
    const values = [id];
    let valueCount = 1;

    if (category) {
      updates.push(`category = $${++valueCount}`);
      values.push(category);
    }
    if (name) {
      updates.push(`name = $${++valueCount}`);
      values.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${++valueCount}`);
      values.push(description);
    }
    if (price !== undefined) {
      updates.push(`price = $${++valueCount}`);
      values.push(price);
    }
    if (menu_type) {
      updates.push(`menu_type = $${++valueCount}`);
      values.push(menu_type);
    }
    if (drink_type !== undefined) {
      updates.push(`drink_type = $${++valueCount}`);
      values.push(drink_type);
    }

    if (updates.length === 0) {
      return { error: "No fields to update" };
    }

    const query = `UPDATE menu_items SET ${updates.join(
      ", "
    )} WHERE id = $1 RETURNING *`;
    const result = await sql(query, values);

    if (result.length === 0) {
      return { error: "Menu item not found" };
    }

    return { item: result[0] };
  } catch (error) {
    if (error.code === "23505") {
      return {
        error: "A menu item with this name and menu type already exists",
      };
    }
    return { error: "Failed to update menu item" };
  }
}