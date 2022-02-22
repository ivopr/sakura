import {
  Box,
  Container,
  ContainerProps,
  Link,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Logo } from "@sword/components/logo";
import dynamic from "next/dynamic";
import NextHead from "next/head";
import { FC } from "react";

export type LayoutProps = ContainerProps & {
  pageTitle: string;
};

const Navigation = dynamic<unknown>(() => import("../navigation").then((mod) => mod.Navigation), {
  ssr: false,
  loading: () => (
    <Box alignItems="center" justifyContent="center" display="flex" height="24">
      <Spinner color="primary.500" emptyColor="gray.500" size="xl" />
    </Box>
  ),
});

export const Layout: FC<LayoutProps> = ({ children, pageTitle, ...rest }): JSX.Element => {
  return (
    <Box justifyContent="space-between" flexDirection="column" display="flex" height="100vh">
      <NextHead>
        <title>{pageTitle} &bull; Sword</title>
      </NextHead>
      <Box>
        <Navigation />
        <Container
          maxWidth="container.lg"
          minHeight="fit-content"
          paddingX={{ base: "2", md: "4", xl: "6" }}
          paddingY={{ base: "2", md: "4", xl: "6" }}
          {...rest}
        >
          {children}
        </Container>
      </Box>
      <Box
        minHeight="fit-content"
        borderTopWidth="1px"
        borderTopColor="whiteAlpha.300"
        backgroundColor="gray.800"
      >
        <Box
          color={useColorModeValue("gray.700", "gray.200")}
          background={useColorModeValue("gray.50", "gray.900")}
        >
          <Container as={Stack} align="center" justify="center" maxWidth="6xl" py={4} spacing={4}>
            <Logo />
            <Stack direction="row" spacing={6}>
              <Link href="#">Home</Link>
              <Link href="#">About</Link>
              <Link href="#">Blog</Link>
              <Link href="#">Contact</Link>
            </Stack>
          </Container>

          <Box
            borderStyle="solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            borderTopWidth={1}
          >
            <Container
              as={Stack}
              align={{ base: "center", md: "center" }}
              justify={{ base: "center", md: "space-between" }}
              direction={{ base: "column", md: "row" }}
              maxWidth="6xl"
              py={4}
              spacing={4}
            >
              <Text>© 2020 Sword. All rights reserved</Text>
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
