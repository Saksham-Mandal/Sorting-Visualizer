interface ArrayDisplayProps {
  values: number[];
  highlightInfo: {
    type: "compare" | "swap" | "sorted";
    indices: number[];
  };
  sortedIndices: number[];
}

const ArrayDisplay = ({
  values,
  highlightInfo,
  sortedIndices,
}: ArrayDisplayProps) => {
  const getBoxClass = (index: number) => {
    if (sortedIndices.includes(index)) return "sorted";
    if (highlightInfo.indices.includes(index)) {
      switch (highlightInfo.type) {
        case "swap":
          return "swap";
        case "compare":
        default:
          return "compare";
      }
    }
    return "";
  };

  return (
    <div className="d-flex justify-content-center align-items-end mt-4">
      {values.map((value, idx) => (
        <div className={`array-display-box ${getBoxClass(idx)}`} key={idx}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default ArrayDisplay;
