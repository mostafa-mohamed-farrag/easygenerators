import { type ReactNode } from "react";

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="label">{label}</label>
      {children}
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}
