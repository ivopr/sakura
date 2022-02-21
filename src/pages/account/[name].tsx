import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { players } from "@prisma/client";
import { Layout } from "@sword/components/layout";
import { DeleteAccountModal } from "@sword/components/modals/delete-account";
import { setupApiClient } from "@sword/services/axios";
import { DateTime } from "luxon";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  IoIdCardOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";

type SingleAccount = {
  id: number;
  name: string;
  email: string;
  type: number;
  premium_ends_at: number;
  creation: number;
  players?: players[];
} | null;

const Account: NextPage = () => {
  const [account, setAccount] = useState<SingleAccount>();
  const router = useRouter();
  const accountLabelSize = "lg";

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
        <Heading>Loading</Heading>
      </Layout>
    );
  }

  return (
    <Layout pageTitle={`${account.name} - Account`}>
      {/** BEGIN Avatar, Name and Email */}
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
        }}
        marginX="auto"
        gap="5"
        width="fit-content"
      >
        <Avatar
          backgroundColor="primary.500"
          marginX={{
            base: "auto",
            md: 0,
          }}
          size="2xl"
        />
        <VStack marginY="auto" spacing="1">
          <Heading textTransform="capitalize">{account.name}</Heading>
          <Text>{account.email}</Text>
        </VStack>
      </SimpleGrid>
      {/** END Avatar, Name and Email */}

      {/** BEGIN Account Info Tabs */}
      <Tabs marginY="5" variant="solid-rounded">
        <TabList gap="2.5" justifyContent="center" flexWrap="wrap">
          <Tab>
            <Icon as={IoIdCardOutline} marginRight="1" />
            Account
          </Tab>
          <Tab>
            <Icon as={IoPersonOutline} marginRight="1" />
            Characters
          </Tab>
          <Tab>
            <Icon as={IoPeopleOutline} marginRight="1" /> Friends
          </Tab>
          <Tab>
            <Icon as={IoSettingsOutline} marginRight="1" /> Settings
          </Tab>
        </TabList>
        <Divider marginY="2" />
        <TabPanels>
          <TabPanel>
            <VStack alignItems="flex-start" spacing="1.5">
              <HStack spacing="1.5">
                <Text fontSize={accountLabelSize} fontWeight="semibold" marginRight="1.5">
                  Group:
                </Text>
                <Text>{account.type}</Text>
              </HStack>
              <HStack spacing="1.5">
                <Text fontSize={accountLabelSize} fontWeight="semibold" marginRight="1.5">
                  Premium:
                </Text>
                <Text>
                  {account.premium_ends_at !== 0
                    ? `Ends in ${DateTime.fromSeconds(account.premium_ends_at).toLocaleString({
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}`
                    : "No"}
                </Text>
              </HStack>
              <HStack spacing="1.5">
                <Text fontSize={accountLabelSize} fontWeight="semibold" marginRight="1.5">
                  Total characters:
                </Text>
                <Text>
                  {account.players && account.players.length > 0 ? account.players.length : 0}
                </Text>
              </HStack>
              <HStack spacing="1.5">
                <Text fontSize={accountLabelSize} fontWeight="semibold" marginRight="1.5">
                  Created at:
                </Text>
                <Text>
                  {DateTime.fromSeconds(account.creation).toLocaleString({
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </HStack>
            </VStack>
          </TabPanel>
          <TabPanel>
            <p>Characters</p>
          </TabPanel>
          <TabPanel>
            <p>Friends</p>
          </TabPanel>
          <TabPanel>
            <Alert flexDir="column" alignItems="center" status="error" variant="left-accent">
              <Box
                justifyContent="space-between"
                marginY={{
                  base: "2.5",
                  md: "0",
                }}
                flexDirection={{
                  base: "column",
                  md: "row",
                }}
                display="flex"
              >
                <AlertIcon boxSize="40px" marginRight="2.5" />
                <Box marginBottom="2.5">
                  <AlertTitle
                    fontSize="lg"
                    textAlign={{
                      base: "center",
                      md: "left",
                    }}
                  >
                    Delete Account
                  </AlertTitle>
                  <AlertDescription maxWidth="xs">
                    Note that every single thing you achieved, your characters, in-game items,
                    EVERYTHING, will be lost FOREVER.
                  </AlertDescription>
                </Box>
              </Box>
              <DeleteAccountModal accountId={account.id} accountName={account.name} />
            </Alert>
          </TabPanel>
        </TabPanels>
      </Tabs>
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
