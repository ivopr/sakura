import { ChakraProvider } from "@chakra-ui/provider";
import { cookieStorageManager, localStorageManager } from "@chakra-ui/react";
import { getMessageFallback, onError } from "@sword/locales/utils";
import { theme } from "@sword/theme";
import type { AppProps } from "next/app";
import { NextIntlProvider } from "next-intl";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const colorModeManager =
    typeof pageProps.cookies === "string"
      ? cookieStorageManager(pageProps.cookies)
      : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      <NextNProgress color="#4169E1" startPosition={0.5} stopDelayMs={100} height={5} />
      <NextIntlProvider
        formats={{
          dateTime: {
            short: {
              day: "numeric",
              month: "short",
              year: "numeric",
            },
          },
        }}
        messages={pageProps.messages}
        now={new Date(pageProps.now)}
        timeZone="America/Porto_Velho"
        onError={onError}
        getMessageFallback={getMessageFallback}
      >
        <Component {...pageProps} />
      </NextIntlProvider>
    </ChakraProvider>
  );
}

export default MyApp;
