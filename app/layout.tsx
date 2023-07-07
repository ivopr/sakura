import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Sakura",
    template: "%s | Sakura",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
