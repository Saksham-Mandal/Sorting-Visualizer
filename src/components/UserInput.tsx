interface UserInputProps {
  value: number;
  onChange: (newValue: number) => void;
  className?: string;
  disabled?: boolean;
}

const UserInput = ({
  value,
  onChange,
  className,
  disabled,
}: UserInputProps) => {
  return (
    <div className="text-center my-3">
      <label htmlFor="arrayLength" className="me-2">
        Array Size:
      </label>
      <input
        className={className}
        id="arrayLength"
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={5}
        max={100}
        step={1}
        disabled={disabled}
      />
    </div>
  );
};

export default UserInput;
