import { Box, Divider, Heading, SimpleGrid, useBreakpointValue, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Layout } from "../components/layout";
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
      },
    ],
  },
  {
    name: "Option 2",
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
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("vertical");
  const dividerOrientation = useBreakpointValue({ base: "horizontal", md: "vertical" }) as
    | "horizontal"
    | "vertical";

  useEffect(() => {
    setOrientation(dividerOrientation);
  }, [dividerOrientation]);
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
        <Box flexDir={{ base: "column", md: "row" }} width="full" display="flex">
          <SideMenu options={MenuArray} />
          <Divider orientation={dividerOrientation} />
        </Box>
        <Heading>Home</Heading>
      </SimpleGrid>
    </Layout>
  );
};

export default Home;
