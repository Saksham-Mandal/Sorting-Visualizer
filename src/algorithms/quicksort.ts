import { delay } from "../utils/delay";

export async function runQuickSort(
  array: number[],
  setArray: (newArray: number[]) => void,
  setHighlight: (info: { type: "compare" | "swap" | "sorted"; indices: number[] }) => void,
  getSpeed: () => number,
  setSortedIndices: React.Dispatch<React.SetStateAction<number[]>>
) {
  const arr = [...array];

  async function quickSort(start: number, end: number): Promise<void> {
    if (start >= end) return;

    const pivotIndex = await partition(start, end);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
  }

  async function partition(low: number, high: number): Promise<number> {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setHighlight({ type: "compare", indices: [j, high] });
      await delay(getSpeed());

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);

        setHighlight({ type: "swap", indices: [i, j] });
        await delay(getSpeed());
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);

    setHighlight({ type: "swap", indices: [i + 1, high] });
    await delay(getSpeed());

    return i + 1;
  }

  await quickSort(0, arr.length - 1);

  // ✅ Final sweep to mark everything sorted
  const allSorted = Array.from({ length: arr.length }, (_, i) => i);
  setHighlight({ type: "sorted", indices: allSorted });
  setSortedIndices(allSorted);
  await delay(getSpeed());
}
