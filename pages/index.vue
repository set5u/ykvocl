<template lang="pug">
div
  MainHeader(ref="headerElementRef")
  Main.main-height
  MainFooter(ref="footerElementRef")
  MainDrawer
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
const headerElementRef = ref<ComponentPublicInstance>();
const footerElementRef = ref<ComponentPublicInstance>();
const { height: windowHeight } = useWindowSize();
const headerElementHeight = ref(0);
const footerElementHeight = ref(0);

const updateHeights = () => {
  headerElementRef.value &&
    (headerElementHeight.value = headerElementRef.value.$el.offsetHeight);
  footerElementRef.value &&
    (footerElementHeight.value = footerElementRef.value.$el.offsetHeight);
};
onMounted(updateHeights);

const onResize = () => {
  updateHeights();
};
addEventListener("resize", onResize);
onUnmounted(() => {
  removeEventListener("resize", onResize);
});

const mainHeight = computed(
  () =>
    windowHeight.value -
    (headerElementHeight.value + footerElementHeight.value) -
    1 +
    "px",
);

const drawerOpen = ref(false);
provide("drawerOpen", drawerOpen);
</script>

<style scoped lang="scss">
.main-height {
  height: v-bind(mainHeight);
}
</style>
