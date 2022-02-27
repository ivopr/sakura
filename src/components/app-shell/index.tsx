import { AppShell as MantineAppShell, AppShellProps as MantineAppShellProps } from "@mantine/core";
import { staticInfo } from "@mantis/config";
import Head from "next/head";
import { useState } from "react";

import { Header } from "../header";
import { Navbar } from "../navbar";

type AppShellProps = MantineAppShellProps & {
  title: string;
};

export function AppShell({ children, title }: AppShellProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Head>
        <title>
          {title} • {staticInfo.serverName}
        </title>
      </Head>
      <MantineAppShell
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={<Navbar padding="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 300 }} />}
        header={<Header height={70} isOpened={opened} setIsOpened={setOpened} />}
      >
        {children}
      </MantineAppShell>
    </>
  );
}
