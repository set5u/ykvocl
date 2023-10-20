<template lang="pug">
div
  HTopAppBar(title="YukiVocaLearn", kind="small")
    template(#navigation-icon)
      HIconButton(label="Menu", @click="drawerOpen = true")
        IconMenu
    template(#trailing)
      NuxtLink(to="/settings")
        HIconButton(label="Settings")
          IconSettings
      //- HMenu
      //-   template(#button)
      //-     div
      //-       HIconButton(label="More")
      //-         IconMoreVert
      //-   template(#content)
      //-     HMenuButton(label="Nothing")
  HDivider
</template>

<script setup lang="ts">
import IconMenu from "~icons/mdi/menu";
import IconSettings from "~icons/mdi/settings";
// import IconMoreVert from "~icons/mdi/moreVert"
const drawerOpen = useState("drawerOpen", () => false);
</script>
