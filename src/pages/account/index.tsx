import { Box, Loader, Title } from "@mantine/core";
import { AppShell } from "@mantis/components/app-shell";
import { withSSRAuth } from "@mantis/hocs/with-ssr-auth";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

export default function AccountRedirect(props: NextPage): JSX.Element {
  return (
    <AppShell title="Redirecting">
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
    </AppShell>
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
