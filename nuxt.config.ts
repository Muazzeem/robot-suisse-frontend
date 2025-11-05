export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  srcDir: 'app/',

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@stefanobartoletti/nuxt-social-share',
  ],

  runtimeConfig: {
    public: {
      baseURL: 'https://api.robot.marketize.biz',
    }
  },

  socialShare: {
    baseUrl: 'https://robot-suisse-frontend.vercel.app'
  },

  css: [
    '/css/main.css',
  ],

  alias: {
    '@': './app',
    '~': '.',
  },

  i18n: {
		strategy: "no_prefix",
		locales: [
      { code: 'en', name: 'English', file: 'en.js' },
      { code: 'dech', name: 'Deutsch (CH)', file: 'dech.js' },
      { code: 'frch', name: 'Français (CH)', file: 'frch.js' },
      { code: 'itch', name: 'Italiano (CH)', file: 'itch.js' }
    ],
		defaultLocale: "dech",
		lazy: true,
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
