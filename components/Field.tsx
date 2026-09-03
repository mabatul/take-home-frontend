import { forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <input
          ref={ref}
          className={cn(
            "mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:outline-none focus:ring-2",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-400 focus:ring-blue-200",
            className
          )}
          {...props}
        />
        {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
      </label>
    );
  }
);

Field.displayName = "Field";