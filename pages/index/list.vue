<template lang="pug">
div(v-if="wordsWithScoreObject.length", v-auto-animate)
  .text-4xl.text-center.my-4 Words
  UiTable(
    fullwidth,
    :thead="thead",
    :tbody="tbody",
    :data="wordsWithScoreObject.slice(pageSize * (page - 1), pageSize * page)"
  )
    template(#action="{ data }")
      NuxtLink(:to="`/edit?i=` + data.index")
        UiIconButton edit
      UiIconButton(@click="deleteAt(data.index)") delete
  UiPagination(
    v-model="page",
    :total="wordsWithScoreObject.length",
    :page-size="[15, 30, 50, 100]",
    show-total,
    page-size-text="Words per page",
    @update:page-size="pageSizeChanged"
  )
    template(#default="{ currentMinRow, currentMaxRow }")
      | {{ currentMinRow }} - {{ currentMaxRow }} / {{ wordsWithScoreObject.length }}
.text-center(v-else)
  .text-4xl No words in word list.
  NuxtLink.mt-4.block.w-fit.mx-auto(to="/add")
    UiButton(raised) Add Word
</template>

<script setup lang="ts">
const { $service } = useNuxtApp();
const wordsWithScoreObject = $service.list.getWordsWithScoreObject();
const deleteAt = $service.list.deleteAt;
const thead = [
  "KEY",
  "VALUE",
  { value: "SCORE", align: "right" },
  { value: "Action", align: "center" },
];
const tbody = [
  "key",
  "value",
  { fn: (data: { score: number }) => data.score, align: "right" },
  { slot: "action", align: "center" },
];

const page = ref(1);
const pageSize = ref(15);
const pageSizeChanged = (size: { pageSize: string }) => {
  pageSize.value = parseInt(size.pageSize);
};
</script>
