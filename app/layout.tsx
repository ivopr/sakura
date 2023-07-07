import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { NavbarProvider } from "@/contexts/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sakura",
    template: "%s | Sakura",
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`bg-background text-onBackground ${inter.variable} z-0`}
    >
      <body className="flex flex-col overflow-hidden h-screen font-sans">
        <NavbarProvider>
          <Header />
          <Navbar />
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex flex-1 flex-col">{children}</div>
            <Footer />
          </div>
        </NavbarProvider>
      </body>
    </html>
  );
}
