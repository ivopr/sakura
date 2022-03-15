import { Avatar, Button, Container, Text, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Logout } from "tabler-icons-react";

import { Loader } from "../components/loader";
import { withSSRAuth } from "../hocs/with-ssr-auth";

export default function Account(): JSX.Element {
  const { data } = useSession();
  const router = useRouter();
  const accountTL = useTranslation("account");
  const commonTL = useTranslation("common");

  if (!data) {
    return <Loader />;
  }

  return (
    <Container size="xs">
      <Head>
        <title>
          {data.user?.name} &bull; {commonTL.t("app-name")}
        </title>
      </Head>
      <Avatar mb="sm" mx="auto" size="xl" src={data.user?.image} />
      <Text align="center">{accountTL.t("welcome")}</Text>
      <Title align="center" sx={(theme) => ({ color: theme.colors[theme.primaryColor][3] })}>
        {data?.user?.name}
      </Title>
      <Button
        fullWidth
        leftIcon={<Logout size={18} />}
        my="md"
        onClick={() => signOut({ redirect: false }).then(() => router.push("/login"))}
      >
        {accountTL.t("logout")}
      </Button>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
      ...(await serverSideTranslations(context.locale ?? "en", ["account", "common"])),
    },
  };
});
