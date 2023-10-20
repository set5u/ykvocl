<template lang="pug">
div
  .text-4xl.text-center Add Word
  UiTextfield.w-full.mt-4(v-model="keyInput") Key
  UiTextfield.w-full.my-2(v-model="valueInput") Value
  .text-right(v-auto-animate)
    .font-bold(v-if="showVaridation", class="!text-red-600") Both properties are Required.
    .font-bold(v-if="added", class="!text-green-600") Successfully added.
    .flex.flex-row-reverse.mt-1
      UiButton(class="!min-w-[5rem]", raised, @click="addWordAndReset") Add
</template>

<script setup lang="ts">
const { $service } = useNuxtApp();
const addWord = $service.add.addWord;

const varidateInputs = () => keyInput.value && valueInput.value;
const showVaridation = ref(false);
const added = ref(false);
const addWordAndReset = () => {
  if (varidateInputs()) {
    addWord(keyInput.value, valueInput.value);
    keyInput.value = "";
    valueInput.value = "";
    showVaridation.value = false;
    added.value = true;
    setTimeout(() => {
      added.value = false;
    }, 2000);
  } else {
    showVaridation.value = true;
  }
};

const keyInput = ref("");
const valueInput = ref("");
</script>
