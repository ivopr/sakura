"use client";
import dynamic from "next/dynamic";

const Content = dynamic(
  () => import("@/components/Navbar/Content").then((mod) => mod.HeaderContent),
  {
    // loading: () => (
    //   <div className="hidden w-72 items-center justify-center lg:flex">
    //     <Spinner className="h-20 w-20" />
    //   </div>
    // ),
    ssr: false,
  }
);

export function NavbarDesktop() {
  return (
    <div className="sticky top-0 z-50 shadow-md hidden w-full md:block">
      <nav className="container space-x-3 items-center h-14 px-8 py-2 flex">
        <Content />
      </nav>
    </div>
  );
}
