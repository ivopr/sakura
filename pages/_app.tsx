import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { useState } from "react";
import { Provider } from "react-redux";

import { Header } from "../components/header";
import { LanguageToggler } from "../components/language-toggler";
import { Navbar } from "../components/navbar";
import { store } from "../store";

function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme): void =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              theme={{
                colorScheme,
                loader: "dots",
                primaryColor: "violet",
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              <NotificationsProvider>
                <AppShell
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === "light"
                        ? theme.fn.darken(theme.colors.gray[0], 0.025)
                        : theme.fn.darken(theme.colors.gray[9], 0.4),
                  })}
                  fixed
                  navbar={
                    <Navbar
                      hiddenBreakpoint="sm"
                      hidden={!opened}
                      onClose={() => setOpened(false)}
                      width={{ sm: 250 }}
                    />
                  }
                  header={<Header height={70} isOpened={opened} setIsOpened={setOpened} />}
                >
                  <LanguageToggler />
                  <Component {...pageProps} />
                </AppShell>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(App);
