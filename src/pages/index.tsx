import { Box, Divider, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { Carousel } from "@sword/components/carousel";
import { EventCard } from "@sword/components/event-card";
import { GuildRanks } from "@sword/components/guild-rank";
import { Layout } from "@sword/components/layout";
import { SideMenu } from "@sword/components/side-menu";
import { DateTime } from "luxon";
import type { GetServerSideProps, NextPage } from "next";

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
            childs: [
              {
                name: "Sub-Sub-Sub-Option 1",
              },
            ],
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
  return (
    <Layout pageTitle="Home" maxWidth="full" maxHeight="full">
      <Flex
        flexDirection={{
          base: "column",
          md: "row",
        }}
        height="full"
        marginX="auto"
      >
        <VStack justifyContent="left" width={{ base: "full", md: "fit-content" }} spacing="5">
          <Box flexDirection={{ base: "column", md: "row" }} display="flex" width="full">
            <SideMenu options={MenuArray} />
            <Divider display={{ base: "none", md: "flex" }} marginX="0.5" orientation="vertical" />
            <Divider display={{ base: "flex", md: "none" }} orientation="horizontal" />
          </Box>
          <SimpleGrid
            gap="5"
            columns={{
              base: 2,
              md: 1,
            }}
          >
            <EventCard name="Capture The Flag" startAt={DateTime.now()} />
            <GuildRanks />
          </SimpleGrid>
        </VStack>
        <VStack
          flexDirection="column"
          justifySelf="center"
          width="full"
          marginTop={{
            base: "5",
            md: "0",
          }}
          marginLeft={{
            base: "0",
            md: "5",
          }}
          background="whiteAlpha.100"
          spacing={10}
        >
          <Carousel />
          <Heading textAlign="center">News & Changes</Heading>
          <Heading color="red.500" fontSize={25} textAlign="center">
            This site is currently under development
          </Heading>
        </VStack>
      </Flex>
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

export default Home;
