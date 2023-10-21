<template lang="pug">
div
  .text-4xl.text-center Settings
  .mt-4.text-2xl.text-center Export
  .w-fit.mx-auto.text-center
    UiButton.m-2(raised, icon="output", @click="exportSavedata") Export Savedata (Including Score)
    UiButton.m-2(raised, icon="output", @click="exportWords") Export Words (Excluding Score)
  .mt-4.text-2xl.text-center Import
  .w-fit.mx-auto.text-center
    UiButton.m-2(
      raised,
      icon="input",
      @click="importSavedataDialogShowing = true"
    ) Import Savedata (Including Score)
    UiButton.m-2(
      raised,
      icon="input",
      @click="importWordsDialogShowing = true"
    ) Import Words (Excluding Score)
  .mt-4.text-2xl.text-center License Info
  .w-fit.mx-auto
    NuxtLink(to="/license")
      UiButton(raised, icon="list_alt") license
  .mt-4.text-2xl.text-center Check for Update the App
  .w-fit.mx-auto
    UiButton(raised, icon="browser_updated", @click="deleteCacheAndShowToast") DELETE CACHE
  UiSnackbar(
    v-model="toastShowing",
    :timeout-ms="5000",
    :message="toastMessage",
    :action-type="1"
  )
  UiDialog(
    v-model="importSavedataDialogShowing",
    mask-closable,
    @confirm="$event && importSavedata()"
  )
    UiDialogTitle Import Savedata
    UiDialogContent
      div
        .text-xl ConflictMode
        UiSelect.py-2(v-model="conflictMode", :options="conflictModeOptions")
        .my-4 SRC: Do not overwrite values when conflict occurs.
        .my-4 DST: Overwrite values when conflict occurs.
        .my-4 APPEND: Add words at any time. Duplication may occur.
        UiTextfield.w-full.my-2(v-model="importingData") Data to Import
        UiButton.w-full.my-2(raised, @click="getImportingDataFromClipboard") Import from Clipboard
        .text-red-500.text-bold This operation cannot be undone.
    UiDialogActions(accept-text="Import Savedata")
  UiDialog(
    v-model="importWordsDialogShowing",
    mask-closable,
    @confirm="$event && importWords()"
  )
    UiDialogTitle Import Savedata
    UiDialogContent
      div
        .text-xl ConflictMode
        UiSelect.py-2(v-model="conflictMode", :options="conflictModeOptions")
        .my-4 SRC: Do not overwrite values when conflict occurs.
        .my-4 DST: Overwrite values when conflict occurs.
        .my-4 APPEND: Add words at any time. Duplication may occur.
        UiTextfield.w-full.my-2(v-model="importingData") Data to Import
        UiButton.w-full.my-2(raised, @click="getImportingDataFromClipboard") Import from Clipboard
        .text-red-500.text-bold This operation cannot be undone.
    UiDialogActions(accept-text="Import Words")
</template>

<script setup lang="ts">
const { $service } = useNuxtApp();
const {
  wordsToString,
  wordsWithScoreToString,
  mergeWords,
  mergeWordsWithScore,
} = $service.settings;
const { copy } = useClipboard();

const toastShowing = ref(false);
const toastMessage = ref("");
const showToast = (text: string) => {
  toastMessage.value = text;
  toastShowing.value = true;
};

const exportSavedata = () => {
  const permissionWrite = usePermission("clipboard-write");
  try {
    if (permissionWrite.value === "denied") {
      throw new Error("Permission denied");
    }
    copy(wordsWithScoreToString()).then(() =>
      showToast("Successfully Exported to Clipboard"),
    );
  } catch (e) {
    showToast("Couldn't write to Clipboard");
  }
};

const exportWords = () => {
  const permissionWrite = usePermission("clipboard-write");
  try {
    if (permissionWrite.value === "denied") {
      throw new Error("Permission denied");
    }
    copy(wordsToString()).then(() =>
      showToast("Successfully Exported to Clipboard"),
    );
  } catch (e) {
    showToast("Couldn't write to Clipboard");
  }
};

const importSavedataDialogShowing = ref(false);
const importWordsDialogShowing = ref(false);
const conflictModeOptions = [
  { label: "SRC", value: "src" },
  { label: "DST", value: "dst" },
  { label: "APPEND", value: "append" },
];
const conflictMode = ref<"src" | "dst" | "append">("src");
const importingData = ref("");

const getImportingDataFromClipboard = async () => {
  try {
    const permission = usePermission("clipboard-read");
    if (permission.value === "denied") {
      throw new Error("Permission denied");
    }
    importingData.value = await navigator.clipboard.readText();
    showToast("Successully read clipboard");
  } catch (e) {
    showToast("Couldn't read clipboard");
  }
};

const importSavedata = () => {
  try {
    mergeWordsWithScore(JSON.parse(importingData.value), conflictMode.value);
    showToast("Successfully Imported.");
  } catch (e) {
    showToast("Failed to import data. Please make sure the format is correct.");
  }
};

const importWords = () => {
  try {
    mergeWords(JSON.parse(importingData.value), conflictMode.value);
    showToast("Successfully Imported.");
  } catch (e) {
    console.error(e);
    showToast("Failed to import data. Please make sure the format is correct.");
  }
};
const deleteCacheAndShowToast = () => {
  deleteCache();
  showToast("Successfully cache deleted.Reloading the page...");
  setTimeout(() => {
    location.reload();
  }, 2000);
};
</script>
