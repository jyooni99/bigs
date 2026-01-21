import { cn } from "@/src/lib/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariants = cva(
  "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-colors flex items-center justify-center",
  {
    variants: {
      variant: {
        primary: "bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700",
        secondary: "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-300",
        primaryOutline:
          "bg-transparent text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white dark:border-sky-700 dark:hover:bg-sky-800 dark:hover:text-white",
        secondaryOutline:
          "bg-transparent text-zinc-600 border border-zinc-600 hover:bg-zinc-600 hover:text-white dark:border-zinc-500 dark:hover:bg-zinc-500 dark:hover:text-white",
        icon: "hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400",
        none: "bg-transparent"
      },
      size: {
        sm: "sm:text-sm text-xs sm:px-4 sm:py-2 px-3 py-1.5 rounded-md",
        lg: "sm:text-base text-sm sm:px-7 sm:py-3 px-5 py-2.5 rounded-md",
        icon: "p-1 rounded",
        full: "w-full py-3 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "full",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> &
  ComponentProps<"button"> & {
    asChild?: boolean;
  };

const Button = ({ children, variant, size, asChild, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type="button"
      {...props}
      className={cn(buttonVariants({ variant, size }), props.className)}
    >
      {children}
    </Comp>
  );
};

export default Button;
