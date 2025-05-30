import { delay } from "../utils/delay";

export async function runSelectionSort(
  array: number[],
  setArray: (newArray: number[]) => void,
  setHighlight: (info: { type: "compare" | "swap" | "sorted"; indices: number[] }) => void,
  getSpeed: () => number,
  setSortedIndices: React.Dispatch<React.SetStateAction<number[]>>
) {
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;

    // Highlight the current index as "sorted" later
    for (let j = i + 1; j < arr.length; j++) {
      setHighlight({ type: "compare", indices: [minIdx, j] });
      await delay(getSpeed());

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      setHighlight({ type: "swap", indices: [i, minIdx] });
      await delay(getSpeed());
    }

    // Add index `i` to sorted
    setSortedIndices((prev) => [...prev, i]);
    await delay(getSpeed());
  }

  // Final index is sorted too
  setSortedIndices((prev) => [...prev, arr.length - 1]);
}