import Intl, { IntlErrorCode } from "next-intl";

export function onError(error: Intl.IntlError): void {
  if (process.env.NODE_ENV !== "production") {
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
      console.warn(error);
    } else {
      console.error(error);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMessageFallback({ namespace, key, error }: Record<string, any>): string {
  const path = [namespace, key].filter((part) => part != null).join(".");

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return `${path} is not yet translated`;
  }
  return `Fix translation message at: ${path}`;
}
