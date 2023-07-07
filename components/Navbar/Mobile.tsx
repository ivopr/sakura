"use client";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/Button";
import { useNavbar } from "@/contexts/Navbar";

const Content = dynamic(
  () => import("@/components/Navbar/Content").then((mod) => mod.HeaderContent),
  {
    // loading: () => (
    //   <div className="hidden w-full items-center justify-center lg:flex">
    //     <Spinner className="h-20 w-20" />
    //   </div>
    // ),
    ssr: false,
  }
);

export function NavbarMobile() {
  const { isNavbarOpen, toggleNavbar } = useNavbar();

  return (
    <>
      <header className="sticky top-0 z-50 shadow-sm bg-white flex h-20 items-center justify-between px-4 py-2 md:hidden">
        <div className="relative w-full flex">
          <Button leftIcon={isNavbarOpen ? X : Menu} onClick={toggleNavbar} />
        </div>
      </header>
      <AnimatePresence mode="wait">
        {isNavbarOpen ? (
          <LazyMotion
            features={() =>
              import("@/utils/motionFeatures").then((res) => res.default)
            }
          >
            <m.aside
              key="nav-aside"
              className="fixed md:hidden mt-20 inset-0 z-50 flex w-full flex-shrink-0 flex-col gap-y-7 overflow-y-auto bg-background py-2.5"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                ease: "easeInOut",
              }}
            >
              <Content />
            </m.aside>
          </LazyMotion>
        ) : null}
      </AnimatePresence>
    </>
  );
}
