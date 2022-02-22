import { Avatar, Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { Layout } from "@sword/components/layout";
import { AccountTabsProps } from "@sword/components/tabs/account";
import { useGetAccountByNameQuery } from "@sword/store/apis/account";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data } = useGetAccountByNameQuery(router.query.name as string);

  if (!data) {
    return (
      <Layout pageTitle="Loading - Account">
        <Box alignItems="center" justifyContent="center" display="flex" height="24">
          <Spinner color="primary.500" emptyColor="gray.500" size="xl" />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout pageTitle={`${data.account.name} - Account`}>
      {/** BEGIN Avatar, Name and Email */}

      <VStack marginY="auto" spacing="5">
        <Avatar
          backgroundColor="primary.500"
          marginX={{
            base: "auto",
            md: 0,
          }}
          size="2xl"
        />
        <Box>
          <Heading textAlign="center" textTransform="capitalize">
            {status === "authenticated" && data.account.id === session?.id
              ? `${data.account.name} (You)`
              : data.account.name}
          </Heading>
          <Text>{data.account.email}</Text>
        </Box>
      </VStack>
      {/** END Avatar, Name and Email */}

      {/** BEGIN Account Info Tabs */}
      <AccountTabs account={data.account} />
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
