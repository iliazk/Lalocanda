async function handler() {
  try {
    const session = getSession();
    if (!session?.user?.email) {
      return { error: "Unauthorized" };
    }

    const result = await SetupGitProject();

    return {
      success: true,
      files: {
        gitIgnore: result.gitIgnore.trim(),
        readme: result.readmeContent.trim(),
      },
      nextSteps: result.nextSteps,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to setup Git project",
    };
  }
}