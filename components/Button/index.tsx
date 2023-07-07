import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

import { cnMerge } from "@/utils/cnMerge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  variant?: ColorVariant;
};

export function Button({
  children,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  variant = "primary",
  ...props
}: Props) {
  return (
    <button
      className={cnMerge(
        "px-4 py-2 rounded-base hover:opacity-80 transition-all",
        {
          "bg-primary text-onPrimary": variant === "primary",
          "bg-secondary text-onSecondary": variant === "secondary",
          "bg-tertiary text-onTertiary": variant === "tertiary",
          "bg-danger text-onDanger": variant === "danger",
          "bg-info text-onInfo": variant === "info",
          "bg-warning text-onWarning": variant === "warning",
          "bg-background/75 text-onBackground": variant === "background",
        }
      )}
      {...props}
    >
      {LeftIcon ? <LeftIcon /> : null}
      {children}
      {RightIcon ? <RightIcon /> : null}
    </button>
  );
}
