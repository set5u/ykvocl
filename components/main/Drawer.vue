<template lang="pug">
UiDrawer(v-model="drawerOpen", type="modal")
  UiDrawerHeader
    UiDrawerTitle YukiVocaLearn
  UiDrawerContent
    UiList
      NuxtLink(to="/")
        UiNavItem(href="javascript:void(0)", :active="$route.path === '/'")
          UiItemFirstContent
            UiIcon home
          UiItemTextContent Home
      NuxtLink(to="/test")
        UiNavItem(
          href="javascript:void(0)",
          :active="$route.path === '/test' || $route.path === '/test/'"
        )
          UiItemFirstContent
            UiIcon note
          UiItemTextContent Test
      NuxtLink(to="/add")
        UiNavItem(
          href="javascript:void(0)",
          :active="$route.path === '/add' || $route.path === '/add/'"
        )
          UiItemFirstContent
            UiIcon note_add
          UiItemTextContent Add Words
      UiItemDivider
      NuxtLink(to="/settings")
        UiNavItem(
          href="javascript:void(0)",
          :active="$route.path === '/settings' || $route.path === '/settings/'"
        )
          UiItemFirstContent
            UiIcon settings
          UiItemTextContent Settings
</template>

<script setup lang="ts">
const drawerOpen = useState("drawerOpen", () => false);
watchEffect(() => {
  if (useRoute().fullPath) {
    drawerOpen.value = false;
  }
});
</script>
