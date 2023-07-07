"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface ContextProps {
  isNavbarOpen: boolean;
  closeNavbar: () => void;
  toggleNavbar: () => void;
}

export const NavbarContext = createContext<ContextProps>({
  isNavbarOpen: false,
  closeNavbar: () => {},
  toggleNavbar: () => {},
});

export const NavbarProvider = ({ children }: PropsWithChildren) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  function toggleNavbar() {
    setIsNavbarOpen((prevIsNavbarOpen) => !prevIsNavbarOpen);
  }

  function closeNavbar() {
    setIsNavbarOpen(false);
  }

  const context = useMemo(
    () => ({
      isNavbarOpen,
      toggleNavbar,
      closeNavbar,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNavbarOpen]
  );

  return (
    <NavbarContext.Provider value={context}>{children}</NavbarContext.Provider>
  );
};

export const useNavbar = (): ContextProps => useContext(NavbarContext);
