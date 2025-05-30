interface SpeedSliderProps {
  value: number;
  onChange: (newSpeed: number) => void;
}

const SpeedSlider: React.FC<SpeedSliderProps> = ({ value, onChange }) => {
  return (
    <div className="text-center my-3">
      <label htmlFor="speed" className="me-2">
        Speed:
      </label>
      <input
        type="range"
        id="speed"
        min="10"
        max="1000"
        step="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="ms-2">{value} ms</span>
    </div>
  );
};

export default SpeedSlider;
