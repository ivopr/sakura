import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";

import { Layout } from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Home">
      <Heading>Home</Heading>
    </Layout>
  );
};

export default Home;
