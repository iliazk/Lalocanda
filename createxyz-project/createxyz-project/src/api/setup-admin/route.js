async function handler() {
  const adminEmail = "admin@lalocanda.fi";
  const adminPassword = "123456";

  try {
    const existingAdmin = await sql`
      SELECT * FROM auth_users WHERE email = ${adminEmail}
    `;

    if (existingAdmin.length === 0) {
      const userResult = await sql`
        INSERT INTO auth_users (email, name) 
        VALUES (${adminEmail}, 'Admin') 
        RETURNING id
      `;

      await sql`
        INSERT INTO auth_accounts ("userId", type, provider, "providerAccountId", password) 
        VALUES (${userResult[0].id}, 'credentials', 'credentials', ${adminEmail}, ${adminPassword})
      `;
    }

    return { success: true };
  } catch (error) {
    console.error("Error setting up admin account:", error);
    return { error: "Failed to setup admin account" };
  }
}