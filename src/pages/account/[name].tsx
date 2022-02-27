import { AppShell } from "@mantis/components/app-shell";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

type AccountPageProps = {
  name: string;
};

export default function Account({ name }: NextPage<AccountPageProps>): JSX.Element {
  return <AppShell title={`${name} - Account`}>{name}</AppShell>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      name: ctx.params?.name,
      session: await getSession(ctx),
    },
  };
};
