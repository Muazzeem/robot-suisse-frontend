export default defineNuxtPlugin(async () => {
  const utilityStore = useUtilityStore();
  const cookie = useCookie('uid', {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax'
  });

  if (!cookie.value) {
    cookie.value = generateUID();
    console.log('Generated new UID:', cookie.value);
  }

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

function generateUID() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}