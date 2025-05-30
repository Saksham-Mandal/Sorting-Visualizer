import { delay } from "../utils/delay";

export async function runInsertionSort(
  array: number[],
  setArray: (newArray: number[]) => void,
  setHighlight: (info: { type: "compare" | "swap" | "sorted"; indices: number[] }) => void,
  getSpeed: () => number,
  setSortedIndices: React.Dispatch<React.SetStateAction<number[]>>
) {
  const arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    setHighlight({ type: "compare", indices: [i, j] });
    await delay(getSpeed());

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      setArray([...arr]);

      setHighlight({ type: "swap", indices: [j, j + 1] });
      await delay(getSpeed());

      j--;

      if (j >= 0) {
        setHighlight({ type: "compare", indices: [j, j + 1] });
        await delay(getSpeed());
      }
    }

    arr[j + 1] = key;
    setArray([...arr]);
  }

  // ✅ Only highlight sorted indices at the end
  const allSorted = Array.from({ length: arr.length }, (_, i) => i);
  setHighlight({ type: "sorted", indices: allSorted });
  setSortedIndices(allSorted);
  await delay(getSpeed());
}
