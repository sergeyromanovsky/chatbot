import {
  Select as ShadCNSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components";

type Props<T> = {
  options: T[];
  onChange: (val: string) => void;
  value: string;
};
const Select = <T extends { value: string; label: string }>({
  options,
  onChange,
  value,
}: Props<T>) => {
  return (
    <ShadCNSelect onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadCNSelect>
  );
};

export default Select;
