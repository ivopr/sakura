import { Box, Container, Divider, SimpleGrid, Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import NextHead from "next/head";
import { FC } from "react";

import { Logo } from "../logo";
import { LayoutProps } from "./layout.props";

const Navigation = dynamic<unknown>(() => import("../navigation").then((mod) => mod.Navigation), {
  ssr: false,
  loading: () => (
    <Box
      alignItems="center"
      backgroundColor="gray.900"
      display="flex"
      justifyContent="center"
      height="24"
    >
      <Spinner color="primary.500" emptyColor="gray.500" size="xl" />
    </Box>
  ),
});

export const Layout: FC<LayoutProps> = ({ children, pageTitle, ...rest }): JSX.Element => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" justifyContent="space-between">
      <NextHead>
        <title>{pageTitle} &bull; Sword</title>
      </NextHead>
      <Box>
        <Navigation />
        <Container
          maxW="container.lg"
          minHeight="fit-content"
          paddingX={{ base: "2", md: "4", xl: "6" }}
          paddingY={{ base: "2", md: "4", xl: "6" }}
          {...rest}
        >
          {children}
        </Container>
      </Box>
      <Box
        backgroundColor="gray.800"
        borderTopColor="whiteAlpha.300"
        borderTopWidth="1px"
        minHeight="xs"
      >
        <Container marginY={{ base: "4", md: "8", xl: "12" }} maxWidth="container.lg">
          <Logo />
          <Divider marginY="2" />
          <SimpleGrid></SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};
