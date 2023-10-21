import type { WordElementWithScore } from "~/types/words";

export function binaryInsert(
  arr: WordElementWithScore[],
  newObj: WordElementWithScore,
) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid]![2] < newObj[2]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  arr.splice(left, 0, newObj);
}
