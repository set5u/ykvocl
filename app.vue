<template lang="pug">
div
  Title YukiVocaLearn
  NuxtPage
</template>

<script setup lang="ts">
import StackTrace from "stacktrace-js";
import "assets/css/dark.css";
const reloadIfUserRequestIt = (message: string) => {
  const confirmed =
    confirm(`A fatal error may have occurred within the application.
Please make sure you are using a modern browser.
Continuing to run may cause further problems.
Would you like to reload the page?
Unsaved progress will be discarded.
Error contents:
${message}
Check the console for details.`);
  confirmed && window.location.reload();
};

window.addEventListener("error", (ev) => {
  const error: Error = ev.error;
  const message = error.toString();
  StackTrace.fromError(error).then((trace): void => {
    console.error(message);
    console.error(trace);
    reloadIfUserRequestIt(message);
  });
});
onErrorCaptured((err) => {
  const message = err.toString();
  StackTrace.get().then((trace): void => {
    console.error(message);
    console.error(trace);
    reloadIfUserRequestIt(message);
  });
  return false;
});
</script>
