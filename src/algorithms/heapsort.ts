import { delay } from "../utils/delay";

export async function runHeapSort(
  array: number[],
  setArray: (newArray: number[]) => void,
  setHighlight: (info: { type: "compare" | "swap" | "sorted"; indices: number[] }) => void,
  getSpeed: () => number,
  setSortedIndices: React.Dispatch<React.SetStateAction<number[]>>
) {
  const arr = [...array];
  const n = arr.length;

  async function heapify(n: number, i: number): Promise<void> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      setHighlight({ type: "compare", indices: [largest, left] });
      await delay(getSpeed());
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
      setHighlight({ type: "compare", indices: [largest, right] });
      await delay(getSpeed());
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);

      setHighlight({ type: "swap", indices: [i, largest] });
      await delay(getSpeed());

      await heapify(n, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  // Heap sort process
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    setArray([...arr]);

    setHighlight({ type: "swap", indices: [0, i] });
    await delay(getSpeed());

    // ✅ Mark this index as sorted
    setSortedIndices((prev) => [...prev, i]);
    await delay(getSpeed());

    await heapify(i, 0);
  }

  // ✅ Final highlight (everything sorted)
  const allSorted = Array.from({ length: arr.length }, (_, i) => i);
  setHighlight({ type: "sorted", indices: allSorted });
  setSortedIndices(allSorted);
  await delay(getSpeed());
}
