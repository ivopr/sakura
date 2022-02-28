import { Box, Loader, Title } from "@mantine/core";
import { staticInfo } from "@mantis/config";
import { withSSRAuth } from "@mantis/hocs/with-ssr-auth";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";

export default function AccountRedirect(): JSX.Element {
  return (
    <>
      <Head>
        <title>Redirecting &bull; {staticInfo.serverName}</title>
      </Head>
      <Box
        sx={{
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          width: "fit-content",
        }}
      >
        <Loader size="xl" />
      </Box>
      <Title align="center" order={3}>
        Redirecting...
      </Title>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const session = await getSession(context);

  return {
    props: {},
    redirect: {
      destination: `/account/${session?.user?.name}`,
      permanent: false,
    },
  };
});
