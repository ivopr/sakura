import { Text } from "@mantine/core";
import { AppShell } from "@mantis/components/app-shell";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function LatestNews(): JSX.Element {
  return (
    <AppShell title="Latest News">
      <Text>Latest News</Text>
    </AppShell>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
};
