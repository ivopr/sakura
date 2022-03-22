import { Box, Loader, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withSSRAuth } from "../../hocs/with-ssr-auth";

export default function AccountRedirect(): JSX.Element {
  const commonTL = useTranslation("common");

  return (
    <>
      <Head>
        <title>
          {commonTL.t("redirecting")} &bull; {commonTL.t("app-name")}
        </title>
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
        {commonTL.t("redirecting")}...
      </Title>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const session = await getSession(context);

  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
    },
    redirect: {
      destination: `/accounts/${session?.user?.name}`,
      permanent: false,
    },
  };
});
