import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  </div>
);

export default InputField; 