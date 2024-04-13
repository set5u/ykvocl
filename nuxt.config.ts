// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    tsConfig: {
      extends: "@tsconfig/strictest/tsconfig.json",
    },
  },
  css: ["assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  router: {
    options: {
      hashMode: true,
    },
  },
  //   app: {
  //     cdnURL: "/ykvocl/",
  //     baseURL: "/ykvocl/",
  //   },
  vite: {
    worker: {
      format: "es",
    },
  },
  modules: [
    "@formkit/auto-animate/nuxt",
    "@vueuse/nuxt",
    "@kevinmarrec/nuxt-pwa",
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/license"],
    },
  },
  pwa: {
    icon: {
      source: "assets/images/vt.png",
    },
    meta: {
      name: "Aji Voca Learn",
      author: "ajiken4610",
      title: "Aji Voca Learn",
      description: "Aji Voca Learn",
      mobileAppIOS: true,
      theme_color: "#055b78",
    },
    manifest: {
      start_url: "/ykvocl/",
      background_color: "#222",
      name: "Aji Voca Learn",
      short_name: "AjiVL",
      description: "Aji Voca Learn",
    },
  },
});
