import { add } from "~/composables/service/add";
import { list } from "~/composables/service/list";
import { test } from "~/composables/service/test";
import { edit } from "~/composables/service/edit";
import { settings } from "~/composables/service/settings";
export interface Service {
  add: typeof add;
  test: typeof test;
  list: typeof list;
  edit: typeof edit;
  settings: typeof settings;
}
const service: Service = {
  add,
  test,
  list,
  edit,
  settings,
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      service,
    },
  };
});
