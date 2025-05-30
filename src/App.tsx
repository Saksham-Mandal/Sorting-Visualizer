import { useState, useEffect, useRef } from "react";
import Button from "./components/Button";
import ArrayDisplay from "./components/ArrayDisplay";
import UserInput from "./components/UserInput";
import SortControls from "./components/SortControls";
import SpeedSlider from "./components/SpeedSlider";
import { handleSort, handleScramble } from "./utils/arrayHandlers";

const App = () => {
  //states
  const [values, setValues] = useState<number[]>([]);
  const [arrayLength, setArrayLength] = useState<number>(15);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("Bubble");
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const animationSpeedRef = useRef(animationSpeed);
  const [highlightInfo, setHighlightInfo] = useState<{
    type: "compare" | "swap" | "sorted";
    indices: number[];
  }>({
    type: "compare",
    indices: [],
  });
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);

  //effects
  useEffect(() => {
    const initialArray = Array.from({ length: arrayLength }, (_, i) => i + 1);
    setValues(initialArray);
  }, [arrayLength]);
  useEffect(() => {
    animationSpeedRef.current = animationSpeed;
  }, [animationSpeed]);

  //Scrambling
  const scrambleValues = () => {
    handleScramble(values, setValues, setHighlightInfo, setSortedIndices);
  };

  //General HandleSort Function
  const handleSortFunction = () =>
    handleSort(
      selectedAlgorithm,
      values,
      setValues,
      setHighlightInfo,
      () => animationSpeedRef.current,
      setSortedIndices,
      setIsSorting
    );

  return (
    <>
      <div className="page-header">
        <h1 className="text-center">Sorting Algorithm Visualizer</h1>
      </div>
      <h2 className="page-subheader">
        <b>Algorithm Type: </b>
        {selectedAlgorithm + " Sort"}
      </h2>
      <div className="align-text-properly">
        <UserInput
          className="me-3"
          value={arrayLength}
          onChange={setArrayLength}
          disabled={isSorting}
        />
        <SpeedSlider value={animationSpeed} onChange={setAnimationSpeed} />
      </div>
      <div>
        <ArrayDisplay
          values={values}
          highlightInfo={highlightInfo}
          sortedIndices={sortedIndices}
        ></ArrayDisplay>
      </div>
      <div className="d-flex justify-content-center align-items-end mt-4">
        <Button onClick={scrambleValues} className="me-3" disabled={isSorting}>
          Scramble
        </Button>
        <SortControls
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
          onSort={handleSortFunction}
          isSorting={isSorting}
        />
      </div>
    </>
  );
};

export default App;
