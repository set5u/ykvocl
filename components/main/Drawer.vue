<template lang="pug">
UiDrawer(v-model="drawerOpen" type="modal")
  UiDrawerHeader
    UiDrawerTitle YukiVocaLearn
  UiDrawerContent
    UiNav
      NuxtLink(to="/")
        UiNavItem(href="javascript:void(0)")
          UiItemFirstContent
            UiIcon home
          UiItemTextContent Home
      NuxtLink(to="/test")
        UiNavItem(href="javascript:void(0)")
          UiItemFirstContent
            UiIcon note
          UiItemTextContent Test
</template>

<script setup lang="ts">
const drawerOpen = useState("drawerOpen", () => false)
watchEffect(() => {
  if (useRoute().fullPath) {
    console.log("hello????")
    drawerOpen.value = false;
  }
});
</script>
