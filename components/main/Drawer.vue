<template lang="pug">
div
  HNavigationDrawer(v-model:open="drawerOpen")
    h1 YukiVocaLearn
    NuxtLink(to="/")
      HNavigationButton(
        :is-active="!!route.fullPath.match(indexReg)",
        label="Home"
      )
        template(#active)
          IconHome
        template(#inactive)
          IconHome
    HDivider
    NuxtLink(to="/settings")
      HNavigationButton(
        :is-active="!!route.fullPath.match(settingsReg)",
        label="Settings"
      )
        template(#active)
          IconSettings
        template(#inactive)
          IconSettings
</template>

<script setup lang="ts">
import IconHome from "~icons/mdi/home";
import IconSettings from "~icons/mdi/settings";
const drawerOpen = inject<Ref<boolean>>("drawerOpen", () => ref(false), true);
const route = useRoute();
watch(toRef(route, "fullPath"), () => {
  drawerOpen.value = false;
});

const indexReg = /^\/?$/;
const settingsReg = /^\/settings\/?$/;
</script>
