async function handler({ sheetUrl }) {
  if (!sheetUrl) {
    return { error: "Sheet URL is required" };
  }

  try {
    // Fetch and parse CSV data
    const response = await fetch(sheetUrl);
    const csvData = await response.text();

    // Parse CSV to rows
    const rows = csvData
      .split("\n")
      .map((row) => row.split(",").map((cell) => cell.trim()));
    const [headers, ...items] = rows;

    // Start a transaction for both delete and insert operations
    await sql.transaction(async (trx) => {
      // Clear existing menu items
      await trx`DELETE FROM menu_items`;

      // Prepare values for batch insert
      const validItems = items.filter((item) => {
        if (item.length < headers.length) return false;

        const menuType = item[0];
        const category = item[1];
        const name = item[2];

        return menuType && category && name;
      });

      // Convert items to flat array for bulk insert
      const values = validItems.flatMap((item) => [
        item[0], // menu_type
        item[1], // category
        item[2], // name
        item[3], // description
        parseFloat(item[4]) || null, // price
        item[5] || null, // drink_type
      ]);

      // Batch insert all items
      if (values.length > 0) {
        const placeholders = validItems
          .map((_, i) => {
            const offset = i * 6;
            return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${
              offset + 4
            }, $${offset + 5}, $${offset + 6})`;
          })
          .join(", ");

        const query = `INSERT INTO menu_items 
          (menu_type, category, name, description, price, drink_type)
          VALUES ${placeholders}`;

        await trx(query, values);
      }
    });

    return {
      success: true,
      message: "Menu updated successfully",
    };
  } catch (error) {
    console.error("Failed to sync menu:", error);
    return {
      error: "Failed to sync menu from sheet",
      details: error.message,
    };
  }
}