type InputRadioProps = {
  isChecked: boolean;
  onChange: () => void;
  label: string;
};

export function InputRadio({ isChecked, onChange, label }: InputRadioProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative flex items-center">
        <input
          type="radio"
          className="sr-only"
          checked={isChecked}
          onChange={onChange}
        />
        <div
          className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
            isChecked ? "border-[#0095e4] bg-transparent" : "border-[#0095e4]"
          }`}
        >
          {isChecked && (
            <div className="w-3 h-3 bg-[#0095e4] rounded-full"></div>
          )}
        </div>
      </div>
      <span className="text-xs text-white">{label}</span>
    </label>
  );
}
