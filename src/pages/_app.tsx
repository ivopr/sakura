import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { store } from "@mantis/store/store";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <AppAux>
            <NextNProgress
              options={{ showSpinner: false }}
              color="#69DB7C"
              startPosition={0.5}
              stopDelayMs={100}
              height={5}
            />
            <Component {...pageProps} />
          </AppAux>
        </SessionProvider>
      </Provider>
    </>
  );
}

type AppAuxProps = {
  children: ReactNode;
};

function AppAux({ children }: AppAuxProps): JSX.Element {
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme): void =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: colorScheme,
          fontFamily: "Poppins",
          loader: "dots",
        }}
      >
        <NotificationsProvider position="top-left">{children}</NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
