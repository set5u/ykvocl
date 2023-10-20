<template lang="pug">
div
  span.inline-block.rounded(
    v-for="(change,i) of diff",
    :key="i",
    class="mx-[.125rem]",
    :class="{ 'bg-green-500': change.added, 'bg-red-500 line-through': change.removed }"
  ) {{ change.value }}
</template>

<script setup lang="ts">
import { diffChars } from "diff";
const props = withDefaults(defineProps<{ src: string; dst: string }>(), {
  src: "",
  dst: "",
});
const diff = computed(() => diffChars(props.src, props.dst));
</script>
