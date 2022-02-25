import { Box, Button, Divider, Flex, Heading, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import { EventCard } from "@sword/components/event-card";
import { GuildRanks } from "@sword/components/guild-rank";
import { Layout } from "@sword/components/layout";
import { SideMenu } from "@sword/components/side-menu";
import { decrement, increment } from "@sword/store/slices/counter";
import { RootState } from "@sword/store/store";
import { DateTime } from "luxon";
import type { GetServerSideProps, NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";

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
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

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
            <SideMenu options={MenuArray} maxLayer={2} />
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
        <Box
          flexDirection="column"
          justifySelf="center"
          display={{ base: "flex", md: "initial" }}
          width={{ base: "full" }}
          marginTop={{
            base: "5",
            md: "0",
          }}
          marginLeft={{
            base: "0",
            md: "5",
          }}
          background="whiteAlpha.100"
        >
          <Heading textAlign={{ base: "center", md: "initial" }}>{count}</Heading>
          <Button onClick={() => dispatch(increment())}>Increment</Button>
          <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        </Box>
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
