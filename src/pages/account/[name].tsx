import { Avatar, Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { Layout } from "@sword/components/layout";
import { AccountTabsProps } from "@sword/components/tabs/account";
import { useGetAccountByNameQuery } from "@sword/store/apis/account";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
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
  const [skipFirstQueryOnMount, setSkipFirstQueryOnMount] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data } = useGetAccountByNameQuery(router.query.name as string, {
    skip: skipFirstQueryOnMount,
  });
  const translate = useTranslations("account.view");

  useEffect(() => {
    if (skipFirstQueryOnMount) {
      setSkipFirstQueryOnMount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              ? `${data.account.name} ${translate("itsYou")}`
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@sword/locales/${locale}.json`)).default,
    },
  };
};

export default Account;
