<template lang="pug">
.border-2.rounded-2xl.p-2.h-full.font-mono
  .h-full.overflow-y-hidden
    textarea.w-full.h-full.bg-transparent.resize-none.whitespace-nowrap(
      ref="textareaRef",
      v-model="code",
      class="focus:outline-0"
    )
</template>

<script setup lang="ts">
import { refDebounced } from "@vueuse/core";
const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const code = ref(props.modelValue);
watch(toRef(props, "modelValue"), (text) => (code.value = text));
const debounsedCode = refDebounced(code, 1000);
watch(debounsedCode, (code) => {
  emit("update:modelValue", code);
});
const textareaRef = ref<HTMLTextAreaElement>();
onMounted(() => {
  if (!textareaRef.value) {
    return;
  }
  const textarea = textareaRef.value;
  textarea.addEventListener("contextmenu", (ev) => {
    ev.preventDefault();
    code.value && useRouter().replace("/" + stringToBase64(code.value));
  });
  textarea.addEventListener("keydown", (ev) => {
    const text = code.value;
    const lines = text.split("\n");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const startLine = getLineNumber(text, start);
    const endLine = getLineNumber(text, end);
    if (ev.key === "Tab") {
      ev.preventDefault();
      if (ev.shiftKey) {
        let operated = 0;
        let firstLineOperated = 0;
        for (var i = startLine; i < endLine + 1; i++) {
          if (lines[i]?.substring(0, 2) === "  ") {
            lines[i] = lines[i]?.substring(2) || "";
            operated++;
            i === startLine && (firstLineOperated = 1);
          }
        }
        code.value = lines.join("\n");
        nextTick(() => {
          textarea.selectionStart =
            startLine === endLine
              ? start - operated * 2
              : start - 2 * firstLineOperated;
          textarea.selectionEnd = end - operated * 2;
        });
      } else {
        for (var i = startLine; i < endLine + 1; i++) {
          lines[i] = "  " + lines[i];
        }
        code.value = lines.join("\n");
        nextTick(() => {
          textarea.selectionStart =
            startLine === endLine
              ? start + (endLine - startLine + 1) * 2
              : start + 2;
          textarea.selectionEnd = end + (endLine - startLine + 1) * 2;
        });
      }
    } else if (
      ev.key === "Enter" &&
      start === end &&
      lines.slice(0, startLine + 1).join("\n").length === start
    ) {
      ev.preventDefault();
      let deletedCount = endLine - startLine;
      for (var i = startLine + 1; i < endLine + 1; i++) {
        lines.splice(startLine, endLine - startLine);
      }
      const prevLineSpace =
        (lines[startLine - deletedCount] || "").match(/ */g)?.[0]?.length || 0;
      lines.splice(startLine - deletedCount + 1, 0, " ".repeat(prevLineSpace));
      code.value = lines.join("\n");
      nextTick(() => {
        textarea.selectionStart = start + prevLineSpace + 1;
        textarea.selectionEnd = start + prevLineSpace + 1;
      });
    }
  });
});
</script>
