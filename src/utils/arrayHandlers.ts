import { runBubbleSort } from "../algorithms/bubblesort";
import { runSelectionSort } from "../algorithms/selectionsort";
import { runInsertionSort } from "../algorithms/insertionsort";
import { runQuickSort } from "../algorithms/quicksort";
import { runHeapSort } from "../algorithms/heapsort";

// Shuffle using Fisher-Yates algorithm
export function scrambleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Handles which algorithm to run
export async function handleSort(
  algorithm: string,
  array: number[],
  setArray: (arr: number[]) => void,
  setHighlight: (info: { type: 'compare' | 'swap' | 'sorted'; indices: number[] }) => void,
  getSpeed: () => number,
  setSortedIndices: React.Dispatch<React.SetStateAction<number[]>>,
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (array.every((val, i, arr) => i === 0 || arr[i - 1] <= val)) {
    // Already sorted — skip animation
    const sorted = Array.from({ length: array.length }, (_, i) => i);
    setHighlight({ type: "sorted", indices: sorted });
    setSortedIndices(sorted);
    return;
  }  
  switch (algorithm) {
    case "Bubble":
        setIsSorting(true);
        await runBubbleSort(array, setArray, setHighlight, getSpeed, setSortedIndices);
        setIsSorting(false);
        break;
    case "Selection":
        setIsSorting(true);
        await runSelectionSort(array, setArray, setHighlight, getSpeed, setSortedIndices);
        setIsSorting(false);
        break;
    case "Insertion":
      setIsSorting(true);
      await runInsertionSort(array, setArray, setHighlight, getSpeed, setSortedIndices);
      setIsSorting(false);
      break;
    case "Quick":
      setIsSorting(true);
      await runQuickSort(array, setArray, setHighlight, getSpeed, setSortedIndices);
      setIsSorting(false);  
      break;
    case "Heap":
      setIsSorting(true);
      await runHeapSort(array, setArray, setHighlight, getSpeed, setSortedIndices);
      setIsSorting(false);  
      break;
    default:
      alert("Algorithm not implemented.");
  }
}

export function handleScramble(
    array: number[],
    setValues: (arr: number[]) => void,
    setHighlight: (info: { type: "compare" | "swap" | "sorted"; indices: number[] }) => void,
    setSortedIndices: React.Dispatch<React.SetStateAction<number[]>>
  ) {
    const shuffled = scrambleArray(array);
    setValues(shuffled);
    setHighlight({ type: "compare", indices: [] });
    setSortedIndices([]);
  }
  