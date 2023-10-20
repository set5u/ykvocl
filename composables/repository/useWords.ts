import { useWordsWithScore } from "../persistence/useWordsWithScore";
import { computed } from "vue";
export default () =>
  computed(() => {
    const ret = [];
    for (const element of useWordsWithScore().value) {
      ret.push([element[0], element[1]]);
    }
    return ret;
  });
