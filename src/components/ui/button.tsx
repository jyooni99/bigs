import { cn } from "@/src/lib/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariants = cva(
  "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-colors flex items-center justify-center",
  {
    variants: {
      variant: {
        primary: "bg-sky-500 text-white hover:bg-sky-600",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        primaryOutline:
          "bg-transparent text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white",
        secondaryOutline:
          "bg-transparent text-gray-600 border border-gray-600 hover:bg-gray-600 hover:text-white",
        icon: "hover:bg-gray-100 dark:hover:bg-gray-700",
      },
      size: {
        sm: "text-sm px-4 py-2 rounded-md",
        lg: "text-base px-7 py-3 rounded-md",
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
