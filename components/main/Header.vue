<template lang="pug">
div
  UiTopAppBar(content-selector="#main")
    div AjiVocaLearn
    template(#nav-icon="{ navIconClass }")
      UiIconButton#drawer-opener(
        :class="navIconClass",
        icon="menu",
        @click="drawerOpen = true"
      )
    template(#toolbar="{ toolbarItemClass }")
      NuxtLink(to="/settings")
        UiIconButton(:class="toolbarItemClass", icon="settings")
</template>
<script setup lang="ts">
const drawerOpen = useState("drawerOpen", () => false);
</script>
