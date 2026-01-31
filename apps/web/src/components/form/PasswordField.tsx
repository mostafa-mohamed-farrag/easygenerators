import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Field } from "./Field";

type PasswordFieldProps = {
  label: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

export function PasswordField({
  label,
  placeholder = "••••••••",
  error,
  register,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Field label={label} error={error?.message}>
      <div className="relative">
        <input
          className="input pr-16"
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          {...register}
        />
        <span className="absolute right-14 top-1/2 h-5 w-px -translate-y-1/2 bg-slate-200" />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-3 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </Field>
  );
}