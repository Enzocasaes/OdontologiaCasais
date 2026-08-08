import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b7afaa]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#dfdddb] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#17181a] !text-white shadow-[0_14px_34px_rgba(23,24,26,0.16)] hover:-translate-y-0.5 hover:bg-[#242629]",
        secondary:
          "bg-white text-[#17181a] shadow-[0_14px_34px_rgba(23,24,26,0.08)] ring-1 ring-[#17181a]/10 hover:-translate-y-0.5 hover:bg-[#e4dfdd]",
        outline:
          "border border-[#17181a]/12 bg-transparent text-[#17181a] hover:-translate-y-0.5 hover:bg-white",
        ghost: "bg-transparent text-[#17181a] hover:bg-[#17181a]/6",
        soft: "bg-[#cfcac6] text-[#17181a] hover:-translate-y-0.5 hover:bg-[#c3bcb8]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
