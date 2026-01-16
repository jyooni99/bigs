// Input.tsx
"use client";

import { cn } from "@/src/lib/cn";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";
import Button from "./button";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
  showPasswordToggle?: boolean;
}

const Input = ({
  label,
  errorMessage,
  showPasswordToggle = false,
  className,
  type = "text",
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-800",
            showPasswordToggle && "pr-10",
            className
          )}
          {...props}
        />

        {showPasswordToggle && (
          <Button
            variant="icon"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff
                className="w-5.5 h-5.5 text-gray-500 dark:text-gray-400"
                strokeWidth={1.5}
              />
            ) : (
              <Eye
                className="w-5.5 h-5.5 text-gray-500 dark:text-gray-400"
                strokeWidth={1.5}
              />
            )}
          </Button>
        )}
      </div>

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default Input;
