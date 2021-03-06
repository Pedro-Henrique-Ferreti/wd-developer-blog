const bodyParser = require('body-parser');
const axios = require('axios');

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'WD Blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My first Nuxt.js project' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/globalComponents.js',
    '@/plugins/dateFilter.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-1fa23-default-rtdb.firebaseio.com',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  loading: {
    color: 'orange',
    height: '4px',
    duration: 6000
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-1fa23-default-rtdb.firebaseio.com',
    fbApiKey: 'AIzaSyDMs1TjCAeYOFUotXQakaXkFI8GEXIA2sY'
  },

  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },

  serverMiddleware: [
    bodyParser.json(),
    '@/api'
  ],

  generate: {
    routes: function() {
      return axios.get('https://nuxt-blog-1fa23-default-rtdb.firebaseio.com/posts.json')
      .then(response => {
        const routes = [];

        for (const key in response.data) {
          routes.push({
            route: '/posts/' + key,
            payload: { postData: response.data[key] }
          });
        }

        return routes;
      });
    }
  }
}
