"use client";

import { cn } from "@/src/lib/cn";
import { ComponentProps } from "react";
import Label from "./label";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
  errorMessage?: string;
}

const TextArea = ({
  label,
  errorMessage,
  className,
  rows = 5,
  ...props
}: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={label} text={label} />
      <textarea
        id={label}
        rows={rows}
        className={cn(
          "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-800 resize-none",
          errorMessage && "border-red-400",
          className
        )}
        {...props}
      />
      {errorMessage && (
        <p className="text-sm text-red-500 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextArea;
