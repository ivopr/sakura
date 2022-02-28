import {
  AppShell as MantineAppShell,
  AppShellProps as MantineAppShellProps,
  Box,
  Divider,
  Loader,
} from "@mantine/core";
import dynamic from "next/dynamic";
import { useState } from "react";

import { Header } from "../header";
import { NavbarProps } from "../navbar";

const Navbar = dynamic<NavbarProps>(() => import("../navbar").then((mod) => mod.Navbar), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "100vh - 70",
          justifyContent: "center",
          width: "300px",
          maxWidth: "300px",
        }}
      >
        <Loader />
      </Box>
      <Divider orientation="vertical" />
    </Box>
  ),
});

type AppShellProps = MantineAppShellProps;

export function AppShell({ children }: AppShellProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  return (
    <MantineAppShell
      navbarOffsetBreakpoint="sm"
      fixed
      styles={{
        main: {
          display: "flex",
          justifyContent: "center",
        },
      }}
      navbar={<Navbar padding="xs" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 300 }} />}
      header={<Header height={70} isOpened={opened} setIsOpened={setOpened} />}
    >
      {children}
    </MantineAppShell>
  );
}
