<template lang="pug">
div
  HTopAppBar(title="YukiVocaLearn", kind="small")
    template(#navigation-icon)
      HIconButton(label="Menu")
        MenuIcon(@click="drawerOpen = true")
  HDivider
</template>
<script setup lang="ts">
import MenuIcon from "~icons/mdi/menu";
const drawerOpen = inject<boolean>("drawerOpen");
</script>
