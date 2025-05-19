import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "orange";
  topRightIcon?: string;
}

export function Badge({
  className,
  variant = "default",
  topRightIcon,
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-block rounded-full px-[20px] py-[12px] text-white text-[14px] font-bold text-center relative";
  const variants = {
    default:
      "bg-gradient-to-br from-[#4D4D4D] to-[#1E1E1E]",
    orange:
      "bg-gradient-to-br from-[#FF5300] to-[#FF8246]",
  };
  return (
    <span
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
      {topRightIcon && (
        <div className="absolute -top-2 -right-2 w-6 h-6 -rotate-[10deg]">
          <Image
            src={topRightIcon}
            alt="Badge icon"
            width={24}
            height={24}
            className="w-full h-full"
          />
        </div>
      )}
    </span>
  );
} 