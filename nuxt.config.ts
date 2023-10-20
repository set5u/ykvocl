// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    tsConfig: {
      extends: "@tsconfig/strictest/tsconfig.json",
    },
  },
  css: ["assets/css/main.css", "balm-ui/dist/balm-ui.css"],
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
  modules: ["@formkit/auto-animate/nuxt"],
});
