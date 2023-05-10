const isDev = process.env.NODE_ENV !== 'production';

export default {
  mode: 'universal',
  ...(!isDev && {
    modern: 'client',
  }),
  head: {
    title: 'nuxt-boilerplate',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  rootDir: __dirname,

  router: {
    prefetchLinks: false,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css',
    '@assets/stylus/fonts.styl',
    '@assets/stylus/base.styl',
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/api' },
    {src: '@/plugins/vue-final-modal'},
    {src: '@/plugins/vue-awesome-swiper'},
    {src: '@/plugins/vue-masonry-css' },
    {src: '@/plugins/directives.js'},
    {src: '@/plugins/vuelidate.js' },
    {src: '@/plugins/vue-mask.js',  mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt',
    'nuxt-basic-auth-module',
  ],

  basic: {
    name: 'ezh',
    pass: 'ezh',
    enabled: process.env.test === 'true' // require boolean value(nullable)
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },
  proxy: {
    '/json': { target: process.env.NUXT_BASE_URL || 'http://localhost:3001' },
    '/api': {
      target: 'http://localhost:3001',
      pathRewrite: {
        '^/api/': '', 
      },
    },
    '/ajax': { target: process.env.api, changeOrigin: true },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    optimizeCss: false,
    filenames: {
      // eslint-disable-next-line no-shadow
      app: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
      // eslint-disable-next-line no-shadow
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
      // eslint-disable-next-line no-shadow
      css: ({ isDev }) => (isDev ? '[name].css' : 'css/[contenthash].css'),
      // eslint-disable-next-line no-shadow
      img: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]'),
      // eslint-disable-next-line no-shadow
      font: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]'),
      // eslint-disable-next-line no-shadow
      video: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'),
    },
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true,
        },
      },
    }),
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
    optimization: {
      minimize: !isDev,
    },
    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true,
      },
    }),
    postcss: {
      preset: {
        browsers: 'cover 99.5%',
        autoprefixer: {
          grid: false,
          flexbox: true
        }
      },
      order: 'cssnanoLast',
    },
    transpile: [
      'swiper',
      'dom7',
      'vue-final-modal'
    ],
  },
  styleResources: {
    stylus: [
      '@assets/stylus/vars.styl',
      '@assets/stylus/mixins.styl',
    ],
  },
}
