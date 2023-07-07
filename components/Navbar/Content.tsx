"use client";
import { Home } from "lucide-react";

import { NavItem } from "@/components/Navbar/Item";

export function HeaderContent() {
  const navigationItems: NavigationItem[] = [
    {
      label: "Inicio",
      href: "/",
      Icon: Home,
      exact: true,
    },
  ];

  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-6">
      {navigationItems.map((link) => (
        <NavItem key={link.label} link={link} />
      ))}
    </nav>
  );
}
