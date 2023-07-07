import type { LucideIcon } from "lucide-react";

declare global {
  interface NavigationItem {
    label: string;
    href?: string;
    Icon?: LucideIcon;
    exact?: boolean;
  }
}
