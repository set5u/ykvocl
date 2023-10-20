import BalmUI from "balm-ui";
// import BalmUIPlus from "balm-ui/dist/balm-ui-plus";

export default defineNuxtPlugin((app) => {
  app.vueApp.use(BalmUI, {
    $theme: {
      primary: "#055b78",
      secondary: "#057853",
      background: "#363845",
      surface: "#212224",
      error: "#e33505",
    },
  });
  //   app.vueApp.use(BalmUIPlus);
});
