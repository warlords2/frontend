export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    css:[
      { 
        src: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
        async: false,
        type: "text/css"
      }
    ],
  },
  server:{
    port: process.env.FRONTEND_PORT || 3000,
    host: '0.0.0.0',
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  },
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost'
      }
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'static/css/index.css',
    'static/css/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: 'plugins/game.client.js', mode:  'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "three"
    ]
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    api_host: process.env.BACKEND_HOST+":"+process.env.BACKEND_PORT || 'localhost:4000',
  }
}
