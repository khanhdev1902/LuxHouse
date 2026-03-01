type QuantitySelectorProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};
export function QuantitySelector({ value, min = 1, max = 99, onChange }: QuantitySelectorProps) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);

    if (isNaN(inputValue)) return;

    if (inputValue < min) return onChange(min);
    if (inputValue > max) return onChange(max);

    onChange(inputValue);
  };

  return (
    <div className="flex justify-between items-center gap-2 border border-gray-300 rounded-lg">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className="w-12 h-7 flex items-center justify-center border hover:bg-gray-100 rounded-lg m-0.5 disabled:opacity-50"
      >
        -
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="min-w-8 max-w-14 text-center font-semibold text-gray-700 outline-none grow"
      />

      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className="w-12 h-7 flex items-center justify-center border hover:bg-gray-100 rounded-lg m-0.5 disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}
