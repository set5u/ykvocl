import { add } from "~/composables/service/add";
import { test } from "~/composables/service/test";
export interface Service {
  add: typeof add;
  test: typeof test;
}
const service: Service = {
  add,
  test,
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      service,
    },
  };
});
