async function handler() {
  const sheetUrl = "SHEET_URL_HERE";

  try {
    const response = await fetch(sheetUrl);
    const csvData = await response.text();

    // Parse CSV starting from row 2 (after headers)
    const rows = csvData
      .split("\n")
      .slice(1)
      .map((row) => row.split(",").map((cell) => cell.trim()))
      .filter((item) => {
        if (item.length < 6) return false;
        const [menu_type, category, name] = item;
        return name && menu_type && category;
      });

    // Delete all existing items and insert new ones in a transaction
    await sql.transaction([
      sql`DELETE FROM menu_items`,

      // Build single insert query with all values
      sql(
        `
        INSERT INTO menu_items (menu_type, category, name, description, price, drink_type)
        VALUES ${rows
          .map(
            (_, i) =>
              `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${
                i * 6 + 5
              }, $${i * 6 + 6})`
          )
          .join(",")}
      `,
        rows.flatMap(
          ([menu_type, category, name, description, price, drink_type]) => [
            menu_type,
            category,
            name,
            description,
            parseFloat(price) || null,
            drink_type || null,
          ]
        )
      ),
    ]);

    return { success: true, message: "Menu updated successfully" };
  } catch (error) {
    return { error: "Failed to sync menu items", details: error.message };
  }
}