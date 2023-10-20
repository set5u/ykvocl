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
    NuxtLink(to="/test")
      HNavigationButton(
        :is-active="!!route.fullPath.match(testReg)",
        label="Test"
      )
        template(#active)
          IconNote
        template(#inactive)
          IconNote
    NuxtLink(to="/add")
      HNavigationButton(
        :is-active="!!route.fullPath.match(addReg)",
        label="Add Word"
      )
        template(#active)
          IconNoteAdd
        template(#inactive)
          IconNoteAdd
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
import IconNote from "~icons/mdi/note";
import IconNoteAdd from "~icons/mdi/noteAdd";
import IconSettings from "~icons/mdi/settings";
const drawerOpen = useState("drawerOpen", () => false);
const route = useRoute();
watch(toRef(route, "fullPath"), () => {
  drawerOpen.value = false;
});

const indexReg = /^\/?$/;
const testReg = /^\/test\/?$/;
const addReg = /^\/add\/?$/;
const settingsReg = /^\/settings\/?$/;
</script>
