import { defineStore } from "pinia";
import { PAGE_API_ROOT } from "~/utils/endpoints";
import { buildParams } from "~/utils/utils";


export const useCommonPageStore = defineStore("commonPageStores", {
  state: () => ({}),

  getters: {},

  actions: {
    async fetchPage(params = {}) {
      return new Promise((resolve, reject) => {
        const config = useRuntimeConfig();

        $fetch(`${PAGE_API_ROOT}/find/${buildParams(params)}`, {
          baseURL: config.public.baseUrl,
        })
          .then((data) => {
            console.log(`${PAGE_API_ROOT}/find/${buildParams(params)}`);
            resolve(data);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },

    async fetchDetailsPage(params = {}) {
      return new Promise((resolve, reject) => {
        const config = useRuntimeConfig();

        $fetch(`${PAGE_API_ROOT}/${buildParams(params)}`, {
          baseURL: config.public.baseUrl,
        })
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
  },
});
