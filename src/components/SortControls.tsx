interface SortControlsProps {
  selectedAlgorithm: string;
  onAlgorithmChange: (newAlgorithm: string) => void;
  onSort: () => void;
  isSorting: boolean;
}

const SortControls: React.FC<SortControlsProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  onSort,
  isSorting,
}) => {
  return (
    <div>
      <select
        value={selectedAlgorithm}
        onChange={(e) => onAlgorithmChange(e.target.value)}
        className="form-select w-auto d-inline-block me-3"
        disabled={isSorting}
      >
        <option value="Bubble">Bubble Sort</option>
        <option value="Selection">Selection Sort</option>
        <option value="Insertion">Insertion Sort</option>
        <option value="Quick">Quick Sort</option>
        <option value="Heap">Heap Sort</option>
      </select>

      <button className="btn btn-primary" onClick={onSort} disabled={isSorting}>
        Sort
      </button>
    </div>
  );
};

export default SortControls;
