import * as fs from 'fs'
import axios from 'axios'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  target: 'static',

  generate: {
    fallback: true,
    routes() {
      return axios.get(`https://api.acmodrepository.com/brand/all/`).then(brands => brands.data.map(b => `/cars/${b.name}/`))
    }
  },

  head: {
    title: 'Assetto Corsa Mod Repository',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Download here a large selection of quality cars and tracks mods for the famous Assetto Corsa simulator developed by kunos simulations'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        name: 'google-site-verification',
        content: 'f6gm0ypHvGLB3K5Zm-RSPBrJqQ89LAOQpDJsK9lWnjw'
      },
      {
        hid : "og:title",
        name : "og:title",
        content :"AC Mod Repository",
      },
      {
        name : "og:site_name",
        content :"Assetto Corsa Mod Repository",
      },
      {
        name : "og:type",
        content :"website",
      },
      {
        name:"og:locale",content :"en_EN"
      },
      {
        hid:"og:url",name:"og:url",content :"www.acmodrepository.com"
      },
      {
        name:"og:description",content :"A user friendly website where you can download a large selection of quality cars and tracks for Assetto Corsa."
      },
      {
        hid:"og:image",name:"og:image",content :"https://i.imgur.com/tUa6yJt.png"
      },
      {
        name:"og:image:width",content :"1200"
      },
      {
        name:"og:image:height",content :"630"
      },
      {
        hid:"og:image:alt",name:"og:image:alt",content :"cars in a race"
      },

    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png'
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fontawesome.js',
    '~/plugins/vuelidate.js',
    '~/plugins/login-check.js',
    '~/plugins/cookieconsent.js',
    '~/plugins/firebase.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    //'bootstrap-vue/nuxt',
    '@nuxtjs/sitemap',

    '@nuxtjs/robots',
  ],

  sitemap: {
    hostname: 'https://www.acmodrepository.com',
    exclude: [
      '/cars/new',
      '/tracks/new',
      '/login',
      '/tracks/edit',
      '/cars/edit',
    ],
    gzip: true,
  },

  robots: {
    UserAgent: '*',
    Disallow: [
      '/cars/new',
      '/tracks/new',
      '/login',
      '/tracks/edit',
      '/cars/edit',
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon : {
      fileName : "favicon.png"
    },
    manifest: {
      lang: 'en',
      name: 'AC Mod Repository',
      short_name: 'AC Mod Repo',
      description: "The best collection of quality cars and tracks mods for Assetto Corsa. Every mod is free, tested and up-to-date",
      useWebmanifestExtension: false,
    },
    meta : {
      title: "AC Mod Repository",
      description: "The best collection of quality cars and tracks mods for Assetto Corsa. Every mod is free, tested and up-to-date",
      author: "davbaldelli",
      ogUrl: "www.acmodrepository.com",
      ogImage: "https://i.imgur.com/tUa6yJt.png"
    }
  },

  firebase : {
    config: {
      // REQUIRED: Official config for firebase.initializeApp(config):
      apiKey: "AIzaSyDIYM65D5DNLNsOSUToov_JcJEh6AupUlg",
      authDomain: "ac-mod-repo.firebaseapp.com",
      projectId: "ac-mod-repo",
      storageBucket: "ac-mod-repo.appspot.com",
      messagingSenderId: "315180351715",
      appId: "1:315180351715:web:d5bef233ddee49100b05d6",
      measurementId: "G-KFQQFD5MJW"
    },
    services: {
      analytics: {
        collectionEnabled: true
      },
      messaging: {
        createServiceWorker: true,
        actions : [
          {
            action: 'car_updated',
            url: "/logs"
          },
          {
            action: "car_added",
            url: "/logs",
          },
          {
            action: 'track_updated',
            url: "/logs"
          },
          {
            action: "track_added",
            url: "/logs",
          },
        ],
        fcmPublicVapidKey: 'BOzJS2NjeABtuVTrY-wUC9nRy_3E1soPnVVIHIdeDGMCExi9c0Nu6jfjU-0VFLoVnS0XUwOet72-ayDIGYFFAgs', // OPTIONAL : Sets vapid key for FCM after initialization
        inject : fs.readFileSync('./serviceWorker.js') ,
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
