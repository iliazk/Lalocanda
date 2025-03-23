async function handler({ id }) {
  if (!id) {
    return { error: "Menu item ID is required" };
  }

  try {
    const result = await sql`
      DELETE FROM menu_items 
      WHERE id = ${id} 
      RETURNING id
    `;

    if (result.length === 0) {
      return { error: "Menu item not found" };
    }

    return { success: true };
  } catch (error) {
    return { error: "Failed to delete menu item" };
  }
}