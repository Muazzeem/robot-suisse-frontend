import { defineStore } from "pinia";
import { PUBLIC_SETTINGS_ENDPOINT, PAGE_API_ROOT } from "../utils/endpoints";

export const useUtilityStore = defineStore("utilityStore", {
  state: () => ({
    settings: null,
    socials: null,
    main_menus: null,
    footer_menus: null,
    robots: null,
    blogs: null,
    isSettingsLoaded: false,
    isRobotsLoaded: false,
    isBlogsLoaded: false,
  }),

  getters: {
    getSettings: (state) => state.settings,
    getSocials: (state) => state.socials,
    getMainMenus: (state) => state.main_menus,
    getFooterMenus: (state) => state.footer_menus,
    getRobots: (state) => state.robots,
    getBlogs: (state) => state.blogs,
  },

  actions: {
    async fetchSettings() {
      if (this.isSettingsLoaded) {
        return;
      }

      try {
        const config = useRuntimeConfig();
        const data = await $fetch(`${PUBLIC_SETTINGS_ENDPOINT}/`, {
          baseURL: config.public.baseURL,
        });

        this.settings = data?.basic_setting || null;
        this.socials = data?.social_setting || null;
        this.main_menus = data?.main_menus || [];
        this.footer_menus = data?.footer_menus || [];
        this.isSettingsLoaded = true;

        return data;
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        throw error;
      }
    },
    
    async fetchRobots() {
      if (this.isRobotsLoaded) {
        return;
      }

      try {
        const config = useRuntimeConfig();
        const data = await $fetch(`${PAGE_API_ROOT}/?type=home.RobotDetailPage&fields=robot_title,thumbnail,fetch_parent,slug`, {
          baseURL: config.public.baseURL,
        });

        this.robots = data?.items || [];
        this.isRobotsLoaded = true;

        return data;
      } catch (error) {
        console.error("Failed to fetch robots:", error);
        throw error;
      }
    },
    
    async fetchBlogs() {
      if (this.isBlogsLoaded) {
        return;
      }

      try {
        const config = useRuntimeConfig();
        const data = await $fetch(`${PAGE_API_ROOT}/?type=home.BlogDetailPage&fields=title,short_description,thumbnail,fetch_parent,last_published_at,slug`, {
          baseURL: config.public.baseURL,
        });

        this.blogs = data?.items || [];
        this.isBlogsLoaded = true;

        return data;
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        throw error;
      }
    }
  },
});

export const truncateText = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + " ...";
  }
  return text;
};