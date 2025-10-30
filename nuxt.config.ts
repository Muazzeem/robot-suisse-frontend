// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
      baseURL: 'https://api.robot.marketize.biz',
      // Add other public runtime config if needed
    }
  },

  css: [
    // Add Bootstrap or your CSS framework here if needed
    // 'bootstrap/dist/css/bootstrap.min.css'
  ],

  app: {
    head: {
      title: 'Robot Marketize',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
    }
  }
})
