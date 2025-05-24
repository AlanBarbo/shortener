import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
}

export default function TextInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  readOnly = false,
  ...rest
}: TextInputProps) {
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-zinc-400"
      placeholder={placeholder}
      readOnly={readOnly}
      {...rest}
    />
  );
}
