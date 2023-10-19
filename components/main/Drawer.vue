<template lang="pug">
div
  HNavigationDrawer(v-model:open="drawerOpen")
    h1 YukiVocaLearn
    NuxtLink(to="/")
      HNavigationButton(:is-active="route.fullPath === '/'", label="Home")
</template>

<script setup lang="ts">
const drawerOpen = inject<boolean>("drawerOpen", false);
const route = useRoute();
</script>
