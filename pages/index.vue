<template lang="pug">
div
  MainHeader(ref="headerElementRef")
  Main.main-height
  MainFooter(ref="footerElementRef")
</template>

<script setup lang="ts">
const headerElementRef = ref<ComponentPublicInstance>();
const footerElementRef = ref<ComponentPublicInstance>();
const headerElementHeight = ref(0);
const footerElementHeight = ref(0);

onMounted(() => {
  headerElementRef.value &&
    (headerElementHeight.value = headerElementRef.value.$el.offsetHeight);
  footerElementRef.value &&
    (footerElementHeight.value = footerElementRef.value.$el.offsetHeight);
});

const windowHeight = ref(window.innerHeight);
const onResize = () => {
  windowHeight.value = window.innerHeight;
};
addEventListener("resize", onResize);
onUnmounted(() => {
  removeEventListener("resize", onResize);
});

const mainHeight = computed(
  () =>
    windowHeight.value -
    (headerElementHeight.value + footerElementHeight.value) +
    "px",
);
</script>

<style scoped lang="scss">
.main-height {
  height: v-bind(mainHeight);
}
</style>
