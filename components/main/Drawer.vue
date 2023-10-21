<template lang="pug">
UiDrawer(v-model="drawerOpen", type="modal")
  UiDrawerHeader
    UiDrawerTitle YukiVocaLearn
  UiDrawerContent
    UiNav
      UiNavItem(href="#/", :active="$route.path === '/'")
        //- NuxtLink(to="/")
        UiItemFirstContent
          UiIcon home
        UiItemTextContent Home
      UiNavItem(
        href="#/test",
        :active="$route.path === '/test' || $route.path === '/test/'"
      )
        UiItemFirstContent
          UiIcon note
        UiItemTextContent Test
      UiNavItem(
        href="#/add",
        :active="$route.path === '/add' || $route.path === '/add/'"
      )
        UiItemFirstContent
          UiIcon note_add
        UiItemTextContent Add Word
      UiNavItem(
        href="#/list",
        :active="$route.path === '/list' || $route.path === '/list/'"
      )
        UiItemFirstContent
          UiIcon notes
        UiItemTextContent Words List
      UiItemDivider
      UiNavItem(
        href="#/settings",
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
