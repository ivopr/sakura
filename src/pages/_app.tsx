import { ChakraProvider } from "@chakra-ui/provider";
import { cookieStorageManager, localStorageManager } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import { theme } from "../theme";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const colorModeManager =
    typeof pageProps.cookies === "string"
      ? cookieStorageManager(pageProps.cookies)
      : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      <NextNProgress color="#4169E1" startPosition={0.5} stopDelayMs={100} height={5} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
