import { defineStore } from "pinia";
import { PAGE_API_ROOT } from "../utils/endpoints";
import { buildParams } from "../utils/utils";

export const useCommonPageStore = defineStore("commonPageStores", {
  state: () => ({}),

  getters: {},

  actions: {
    async fetchPage(params = {}) {
      const config = useRuntimeConfig();
      
      try {
        const data = await $fetch(`${PAGE_API_ROOT}/find/${buildParams(params)}`, {
          baseURL: config.public.baseURL, // Changed from baseUrl
        });
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async fetchDetailsPage(params = {}) {
      const config = useRuntimeConfig();
      
      try {
        const data = await $fetch(`${PAGE_API_ROOT}/${buildParams(params)}`, {
          baseURL: config.public.baseURL, // Changed from baseUrl
        });
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
});