import { Box, Title } from "@mantine/core";
import { staticInfo } from "@mantis/config";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";

export default function LatestNews(): JSX.Element {
  return (
    <Box>
      <Head>
        <title>Latest News &bull; {staticInfo.serverName}</title>
      </Head>
      <Title>Latest News</Title>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
};
