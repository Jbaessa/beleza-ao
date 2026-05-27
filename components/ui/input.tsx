import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-noir-400 pointer-events-none">
            {icon}
          </div>
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-lg border border-noir-800 bg-noir-925 pl-10 pr-4 py-2 text-sm text-noir-100 placeholder:text-noir-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-noir-800 bg-noir-925 px-4 py-2 text-sm text-noir-100 placeholder:text-noir-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
