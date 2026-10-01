import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-sm font-medium tracking-[-0.005em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bronze disabled:pointer-events-none disabled:opacity-50 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-[3px]",
  {
    variants: {
      variant: {
        default: "bg-ink !text-paper hover:bg-slate",
        light: "bg-paper !text-ink hover:bg-sand",
        outline: "border border-ink/20 bg-transparent text-ink hover:border-ink/60",
        "outline-light": "border border-paper/30 bg-transparent !text-paper hover:border-paper/70",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-10 px-4",
        lg: "h-[3.25rem] px-7 text-[0.9375rem]",
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
