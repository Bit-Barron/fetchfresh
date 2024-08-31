import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputFieldProps } from "@/types/account";

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
}) => (
  <div className="grid gap-1">
    <Label htmlFor={id}>{label}</Label>
    <Input
      className="bg-inputbg"
      id={id}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputField;
