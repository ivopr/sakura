"use client";
import { PropsWithChildren } from "react";
import { getSession, SessionProvider } from "next-auth/react";

export default async function SessionHandler({ children }: PropsWithChildren) {
  const session = await getSession();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
