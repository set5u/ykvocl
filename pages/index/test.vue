<template lang="pug">
div(v-if="problem", v-auto-animate)
  .text-4xl.text-center {{ problem[0] }}
  template(v-if="showResult === undefined")
    .text-center {{ getMaskedString(problem[1]) }}
    UiTextfield.w-full.mt-4(
      v-if="showResult === undefined",
      v-model="answer",
      @enter="confirm"
    ) Value
    .block.ml-auto.w-fit
      UiButton.mt-4(raised, @click="confirm") Confirm
  .text-center(v-else)
    div Answer: {{ problem[1] }}
    .font-bold(v-if="answer === problem[1]", class="!text-green-500")
      UiIcon check
      span.align-top Correct!
    template(v-else)
      div Answered: {{ answer }}
      .font-bold(class="!text-red-500")
        UiIcon error
        span.align-top Incorrect!
      PartsDiff.mb-2(:src="answer", :dst="problem[1]")
    .block.mx-auto.w-fit
      UiButton(raised, @click="next") Next
  .flex.flex-row-reverse(v-auto-animate)
    .font-bold.mt-4(v-if="showVaridation", class="!text-red-600")
      UiIcon error
      span.align-top Value is Required.
.text-center(v-else)
  .text-4xl
    UiIcon.mx-2 contact_support
    | No words in word list.
  AddButton.mt-4.block.w-fit.mx-auto
</template>

<script setup lang="ts">
const { $service } = useNuxtApp();
const test = $service.test;
const { problem, updateScore } = test;
const answer = ref("");
const showVaridation = ref(false);
const showResult = ref<boolean | undefined>(undefined);
const confirm = () => {
  if (answer.value && problem.value) {
    showVaridation.value = false;
    showResult.value = answer.value === problem.value[1];
  } else {
    showVaridation.value = true;
  }
};
const next = () => {
  if (answer.value && problem.value) {
    updateScore(answer.value === problem.value[1]);
    showResult.value = undefined;
    answer.value = "";
  }
};
</script>
