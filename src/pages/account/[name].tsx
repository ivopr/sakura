import {
  Avatar,
  Divider,
  Heading,
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
import { DateTime } from "luxon";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  IoIdCardOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";

import { Layout } from "../../components/layout";
import { setupApiClient } from "../../services/axios";

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
          <Heading>{account.name}</Heading>
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
              <Text display="flex">
                <Text fontWeight="semibold" marginRight="1.5">
                  Group:
                </Text>
                {account.type}
              </Text>
              <Text display="flex">
                <Text fontWeight="semibold" marginRight="1.5">
                  Premium:
                </Text>
                {account.premium_ends_at !== 0
                  ? `Ends in ${DateTime.fromSeconds(account.premium_ends_at).toLocaleString({
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}`
                  : "No"}
              </Text>
              <Text display="flex">
                <Text fontWeight="semibold" marginRight="1.5">
                  Total characters:
                </Text>
                {account.players && account.players.length > 0 ? account.players.length : 0}
              </Text>
              <Text display="flex">
                <Text fontWeight="semibold" marginRight="1.5">
                  Created at:
                </Text>
                {DateTime.fromSeconds(account.creation).toLocaleString({
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </VStack>
          </TabPanel>
          <TabPanel>
            <p>Characters</p>
          </TabPanel>
          <TabPanel>
            <p>Friends</p>
          </TabPanel>
          <TabPanel>
            <p>Settings</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/** END Account Info Tabs */}
    </Layout>
  );
};

export default Account;
