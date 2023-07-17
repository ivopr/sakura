import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { NavbarProvider } from "@/contexts/Navbar";

import { authOptions } from "./api/auth/[...nextauth]/route";
import { Session } from "./Session";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sakura",
    template: "%s | Sakura",
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      className={`bg-background text-onBackground ${inter.variable} z-0`}
    >
      <body className="flex flex-col overflow-hidden h-screen font-sans">
        <Session session={session}>
          <NavbarProvider>
            <Header />
            <Navbar />
            <div className="flex flex-1 flex-col overflow-y-auto">
              <div className="flex flex-1 flex-col">{children}</div>
              <Footer />
            </div>
          </NavbarProvider>
        </Session>
      </body>
    </html>
  );
}
