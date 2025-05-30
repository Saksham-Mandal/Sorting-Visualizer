import { delay } from "../utils/delay"

export async function runBubbleSort(
    array: number[],
    setArray: (newArray: number[]) => void,
    setHighlight: (info: { type: "compare" | "swap" | "sorted"; indices: number[] }) => void,
    getSpeed: () => number,
    setSortedIndices: React.Dispatch<React.SetStateAction<number[]>>,
  ) {
    const arr = [...array];
    const n = arr.length;
    const sorted: number[] = [];
  
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
  
      for (let j = 0; j < n - 1 - i; j++) {
        // Highlight comparison
        setHighlight({ type: "compare", indices: [j, j + 1] });
        await delay(getSpeed());
  
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
  
          // Highlight swap
          setHighlight({ type: "swap", indices: [j, j + 1] });
          await delay(getSpeed());
  
          swapped = true;
        }
      }
  
      // Mark final sorted element at the end of the current pass
      const sortedIndex = n - 1 - i;
      sorted.push(sortedIndex);
      setHighlight({ type: "sorted", indices: [...sorted] });
      setSortedIndices([...sorted]);
      await delay(getSpeed());
  
      // If no swaps happened, the array is sorted
      if (!swapped) {
        const remainingSorted = Array.from({ length: n - i - 1 }, (_, k) => k);
        const allSorted = [...remainingSorted, ...sorted];
        setHighlight({ type: "sorted", indices: allSorted });
        setSortedIndices(allSorted);
        break;
      }
    }
  
    // Final element at index 0 is also sorted
    if (sorted.length < n) {
      sorted.push(0);
      setHighlight({ type: "sorted", indices: [...sorted] });
      setSortedIndices([...sorted]);
    }

    // ✅ Final pass to ensure all values are marked green
    const allSorted = Array.from({ length: arr.length }, (_, i) => i);
    setHighlight({ type: "sorted", indices: allSorted });
    setSortedIndices(allSorted);
    await delay(getSpeed());
  }
  