import theme from "./assets/theme";

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
  app: {
    cdnURL: "/ykvocl/",
  },
  vite: {
    worker: {
      format: "es",
    },
  },
  modules: [
    ["halcyon-vue-nuxt", theme],
    ["unplugin-icons/nuxt", { autoInstall: true }],
    "@formkit/auto-animate/nuxt",
  ],
});
