import { ChakraProvider } from "@chakra-ui/provider";
import { cookieStorageManager, localStorageManager } from "@chakra-ui/react";
import { store } from "@sword/store/store";
import { theme } from "@sword/theme";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const colorModeManager =
    typeof pageProps.cookies === "string"
      ? cookieStorageManager(pageProps.cookies)
      : localStorageManager;

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
          <NextNProgress color="#4169E1" startPosition={0.5} stopDelayMs={100} height={5} />
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
