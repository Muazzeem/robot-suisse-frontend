export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  srcDir: 'app/',
  
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  runtimeConfig: {
    public: {
      baseURL: 'https://api.robot.marketize.biz',
    }
  },

  css: [
    '/css/main.css',
  ],

  alias: {
    '@': './app',
    '~': '.',
  },

  app: {
    head: {
      title: 'RobotSuisse',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        {
          src: 'https://kit.fontawesome.com/f022d154d0.js',
          crossorigin: 'anonymous'
        }
      ]
    }
  }
})
