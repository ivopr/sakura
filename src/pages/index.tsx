import { Box, Divider, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { EventCard } from "@sword/components/event-card";
import { GuildRanks } from "@sword/components/guild-rank";
import { Layout } from "@sword/components/layout";
import type { GetStaticProps, NextPage } from "next";
import { useTranslations } from "next-intl";

import { SideMenu } from "../components/side-menu";

type FunnyMenu = {
  name: string;
  childs?: FunnyMenu[];
  action?: () => void;
};

const MenuArray: FunnyMenu[] = [
  {
    name: "Option 1",
    childs: [
      {
        name: "Sub-Option 1",
        action: () => console.log("IVO GAY"),
      },
    ],
  },
  {
    name: "Option 2",
    childs: [
      {
        name: "Sub-Option 1",
        childs: [
          {
            name: "Sub-Sub-Option 1",
          },
        ],
      },
      {
        name: "Sub-Option 2",
      },
    ],
  },
  {
    name: "Option 3",
  },
  {
    name: "Option 4",
  },
  {
    name: "Option 5",
  },
];

const Home: NextPage = () => {
  const translate = useTranslations("home");

  return (
    <Layout pageTitle="Home" maxW="full" maxH="full">
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
        }}
        marginX="auto"
        gap="5"
        height="full"
      >
        <VStack justifyContent="left" width="fit-content" spacing="5">
          <Box flexDir={{ base: "column", md: "row" }} width="full" display="flex">
            <SideMenu options={MenuArray} />
            <Divider
              display={{ base: "none", md: "flex" }}
              orientation="vertical"
              borderStartWidth={5}
            />
            <Divider
              display={{ base: "flex", md: "none" }}
              orientation="horizontal"
              borderBottomWidth={5}
            />
          </Box>
          <EventCard name="Capture The Flag" startAt={new Date()} />
          <GuildRanks />
        </VStack>
        <Heading textAlign={{ base: "center", md: "initial" }}>{translate("Home")}</Heading>
      </SimpleGrid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@sword/locales/${locale}.json`)).default,
    },
  };
};

export default Home;
