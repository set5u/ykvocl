import { add } from "~/composables/service/add";
import { list } from "~/composables/service/list";
import { test } from "~/composables/service/test";
import { edit } from "~/composables/service/edit";
export interface Service {
  add: typeof add;
  test: typeof test;
  list: typeof list;
  edit: typeof edit;
}
const service: Service = {
  add,
  test,
  list,
  edit,
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      service,
    },
  };
});
