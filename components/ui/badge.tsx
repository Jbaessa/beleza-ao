import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        gold: "bg-gold-500/15 border-gold-500/30 text-gold-400",
        rose: "bg-rose-500/15 border-rose-500/30 text-rose-400",
        dark: "bg-noir-900 border-noir-700 text-noir-300",
        success: "bg-green-900/50 border-green-700 text-green-400",
        warning: "bg-yellow-900/50 border-yellow-700 text-yellow-400",
        danger: "bg-red-900/50 border-red-700 text-red-400",
        outline: "bg-transparent border-noir-600 text-noir-300",
        verified: "bg-gold-500/10 border-gold-500/40 text-gold-400",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
