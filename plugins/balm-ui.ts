import BalmUI from "balm-ui";
// import BalmUIPlus from "balm-ui/dist/balm-ui-plus";

export default defineNuxtPlugin((app) => {
  app.vueApp.use(BalmUI);
  //   app.vueApp.use(BalmUIPlus);
});
