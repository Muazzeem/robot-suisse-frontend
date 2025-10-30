export default defineNuxtPlugin(async () => {
  const utilityStore = useUtilityStore();

  if (!utilityStore.getSettings || !utilityStore.getRobots || !utilityStore.getBlogs) {
    try {
      if (!utilityStore.getSettings) await utilityStore.fetchSettings();
      if (!utilityStore.getRobots) await utilityStore.fetchRobots();
      if (!utilityStore.getBlogs) await utilityStore.fetchBlogs();
    } catch (error) {
      console.error("Failed to initialize settings:", error);
    }
  }
});


