async function handler() {
  try {
    const response = await fetch("/api/sync-menu-from-sheet", {
      method: "POST",
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to auto-sync menu:", error);
    return { success: false, error: error.message };
  }
}