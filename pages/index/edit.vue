<template lang="pug">
div
  .text-4xl.text-center Edit Word
  UiTextfield.w-full.mt-4(v-model="current[0]") Key
  UiTextfield.w-full.my-2(v-model="current[1]") Value
  .text-right(v-auto-animate)
    .font-bold(v-if="showVaridation", class="!text-red-600") Both properties are Required.
    .flex.flex-row-reverse.mt-1
      UiButton(
        class="!min-w-[5rem]",
        raised,
        :disabled="showVaridation",
        @click="saveDataAndGoBack"
      ) Confirm
</template>

<script setup lang="ts">
const { $service } = useNuxtApp();
const { wordsWithScore } = $service.edit;
const index = parseInt(useRoute().query["i"]?.toString() || "-1");
const current = reactive(
  wordsWithScore.value[index]!.slice() as [string, string, number],
);
const varidateInputs = () => current[0] && current[1];
const showVaridation = computed(() => !varidateInputs());
const saveDataAndGoBack = () => {
  wordsWithScore.value[index] = current;
  useRouter().back();
};
</script>
