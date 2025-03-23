async function handler() {
  const session = getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  try {
    const helsinkiDate = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Helsinki",
    });
    const today = new Date(helsinkiDate).toISOString().split("T")[0];

    console.log("Fetching reservations for date:", today);

    const [reservations, menuStats] = await sql.transaction([
      sql`
        SELECT 
          id, 
          table_number, 
          reservation_date, 
          reservation_time, 
          customer_name, 
          customer_email, 
          status, 
          end_time, 
          phone, 
          guests, 
          notification_sent, 
          sheet_id,
          COALESCE(total_amount, 0) as total_amount
        FROM reservations 
        WHERE reservation_date = ${today}
        ORDER BY reservation_time ASC
      `,
      sql`
        SELECT 
          menu_type, 
          COUNT(*) as count 
        FROM menu_items 
        GROUP BY menu_type 
        ORDER BY menu_type
      `,
    ]);

    console.log("Found reservations:", reservations.length);
    console.log("Menu counts:", menuStats);

    return {
      success: true,
      stats: {
        todaysReservations: reservations,
        menuItemCounts: menuStats,
      },
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return { error: "Failed to fetch dashboard stats" };
  }
}