async function handler({ email, currentPassword, newPassword }) {
  if (!email || !currentPassword || !newPassword) {
    return { error: "Missing required fields" };
  }

  try {
    const users = await sql(
      `SELECT auth_users.id, auth_accounts.password 
       FROM auth_users 
       JOIN auth_accounts ON auth_users.id = auth_accounts."userId"
       WHERE auth_users.email = $1`,
      [email]
    );

    if (users.length === 0) {
      return { error: "User not found" };
    }

    if (users[0].password !== currentPassword) {
      return { error: "Current password is incorrect" };
    }

    await sql(
      `UPDATE auth_accounts 
       SET password = $1 
       WHERE "userId" = $2`,
      [newPassword, users[0].id]
    );

    return { success: true };
  } catch (error) {
    console.error("Password change error:", error);
    return { error: "Failed to change password" };
  }
}