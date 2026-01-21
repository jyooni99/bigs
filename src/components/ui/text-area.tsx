"use client";

import { cn } from "@/src/lib/cn";
import { ComponentProps } from "react";
import Label from "./label";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
  errorMessage?: string;
}

const TextArea = ({
  id,
  label,
  errorMessage,
  className,
  rows = 5,
  ...props
}: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        rows={rows}
        className={cn(
          "w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-700 dark:bg-zinc-900 resize-none",
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
