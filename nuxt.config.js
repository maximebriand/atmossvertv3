export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'atmossvert-v3',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/styles.scss'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        'nuxt-gsap',
    ],

    nuxtGsap: {
        imports: ['Back', 'Circ'], // Specify the gsap modules you want to import. By default, gsap & Linear are loaded
    },
    env: {
        imgUrl: 'http://localhost:1337'
    },
    publicRuntimeConfig: {
        axios: {
            baseURL: 'http://localhost:3000'
        }
    },
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        ['@nuxtjs/axios']
    ],
    axios: {
        // debug: strue,
        proxy: true
    },

    proxy: {
        '/api/': { target: 'http://api.atmossvert.fr/wp-json/wp/v2/', pathRewrite: { '^/api/': '' } }
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    router: { base: '/atmossvert' }
}