import { Box, Divider, Heading, SimpleGrid } from "@chakra-ui/react";
import { Layout } from "@sword/components/layout";
import type { NextPage } from "next";

import { SideMenu } from "../components/side-menu-options";

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
        action: () => console.log("Ivo gay"),
      },
    ],
  },
  {
    name: "Option 2",
    childs: [
      {
        name: "Sub-Option 1",
        action: () => console.log("Ivo gay"),
        childs: [
          {
            name: "Sub-Sub-Option 1",
          },
        ],
      },
      {
        name: "Sub-Option 2",
        action: () => console.log("Ivo gay"),
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
        <Box flexDir={{ base: "column", md: "row" }} width="full" maxW="xs" display="flex">
          <SideMenu options={MenuArray} />
          <Divider orientation="vertical" />
        </Box>
        <Heading>Home</Heading>
      </SimpleGrid>
    </Layout>
  );
};

export default Home;
