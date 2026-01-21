// Input.tsx
"use client";

import { cn } from "@/src/lib/cn";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";
import Button from "./button";
import Label from "./label";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
}

const Input = ({
  label,
  errorMessage,
  helperText,
  showPasswordToggle = false,
  className,
  type = "text",
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={label} text={label} />
      <div className="relative">
        <input
          id={label}
          type={inputType}
          className={cn(
            "w-full px-4 py-2.5 sm:text-base text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-800",
            showPasswordToggle && "pr-10",
            errorMessage && "border-red-400",
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
                className="sm:size-5.5 size-5 text-gray-500 dark:text-gray-400"
                strokeWidth={1.5}
              />
            ) : (
              <Eye
                className="sm:size-5.5 size-5 text-gray-500 dark:text-gray-400"
                strokeWidth={1.5}
              />
            )}
          </Button>
        )}
      </div>
      {errorMessage ? (
        <p className="sm:text-sm text-xs text-red-500 dark:text-red-400">{errorMessage}</p>
      ) : helperText ? (
        <p className="sm:text-sm text-xs text-zinc-400 dark:text-zinc-400">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
