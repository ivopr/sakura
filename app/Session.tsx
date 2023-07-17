"use client";
import { PropsWithChildren } from "react";
import { Session as SessionType } from "next-auth";
import { SessionProvider } from "next-auth/react";

type Props = {
  session: SessionType | null;
};

export async function Session({ children, session }: PropsWithChildren<Props>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
