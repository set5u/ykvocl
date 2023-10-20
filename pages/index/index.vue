<template lang="pug">
div
  HButton.mx-auto(
    kind="elevated",
    content="HELLOWORLD!",
    @click="enabled = !enabled"
  )
    HSwitch#HeartSwitch(v-model="enabled", @click.stop)
      template(#off)
        HeartOutline
      template(#on)
        Heart
</template>

<script setup lang="ts">
import HeartOutline from "~icons/mdi/heartOutline";
import Heart from "~icons/mdi/heart";
const enabled = ref(true);
watchEffect(() => console.log(enabled.value));
</script>
