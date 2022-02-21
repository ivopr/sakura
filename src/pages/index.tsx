import { Heading } from "@chakra-ui/react";
import { Layout } from "@sword/components/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout pageTitle="Home">
      <Heading>Home</Heading>
    </Layout>
  );
};

export default Home;
