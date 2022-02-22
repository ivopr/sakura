import { Avatar, Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { Layout } from "@sword/components/layout";
import { AccountTabsProps } from "@sword/components/tabs/account";
import { setupApiClient } from "@sword/services/axios";
import { SingleAccount } from "@sword/types/account";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AccountTabs = dynamic<AccountTabsProps>(
  () => import("@sword/components/tabs/account").then((mod) => mod.AccountTabs),
  {
    ssr: false,
    loading: () => (
      <Box alignItems="center" justifyContent="center" display="flex" height="24">
        <Spinner color="primary.500" emptyColor="gray.500" size="xl" />
      </Box>
    ),
  }
);

const Account: NextPage = () => {
  const [account, setAccount] = useState<SingleAccount>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { name } = router.query;
      if (!name) return;

      const api = setupApiClient();

      await api
        .get<{ account: SingleAccount }>(
          `/account/read?type=one&name=${name}&shouldBringRelations=true`
        )
        .then(({ data }) => {
          setAccount(data.account);
        })
        .catch(({ response }) => console.log(response.data));
    })();
  }, [router]);

  if (!account) {
    return (
      <Layout pageTitle="Loading - Account">
        <Box alignItems="center" justifyContent="center" display="flex" height="24">
          <Spinner color="primary.500" emptyColor="gray.500" size="xl" />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout pageTitle={`${account.name} - Account`}>
      {/** BEGIN Avatar, Name and Email */}

      <VStack marginY="auto" spacing="1">
        <Avatar
          backgroundColor="primary.500"
          marginX={{
            base: "auto",
            md: 0,
          }}
          size="2xl"
        />
        <Heading textTransform="capitalize">{account.name}</Heading>
        <Text>{account.email}</Text>
      </VStack>
      {/** END Avatar, Name and Email */}

      {/** BEGIN Account Info Tabs */}
      <AccountTabs account={account} />
      {/** END Account Info Tabs */}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@sword/locales/${locale}.json`)).default,
    },
  };
};

export default Account;
