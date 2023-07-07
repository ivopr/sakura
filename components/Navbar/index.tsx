"use client";
import { NavbarDesktop } from "@/components/Navbar/Desktop";
import { NavbarMobile } from "@/components/Navbar/Mobile";

export function Navbar() {
  return (
    <>
      <NavbarDesktop />
      <NavbarMobile />
    </>
  );
}
