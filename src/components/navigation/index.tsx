import { Box, chakra, Flex, HStack, IconButton, useDisclosure, VStack } from "@chakra-ui/react";
import { Logo } from "@sword/components/logo";
import NextLink from "next/link";
import React from "react";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";

import { NAV_ITEMS } from "./items";
import { NavigationButton } from "./navigation-button";

export function Navigation(): JSX.Element {
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        backgroundColor="gray.800"
        borderBottomColor="whiteAlpha.300"
        borderBottomWidth="1px"
        display="flex"
        height="24"
        paddingX={{ base: 2, md: 4, xl: 6 }}
        position="sticky"
        top={0}
        width="full"
        zIndex="sticky"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          height={12}
          margin="auto"
          width="100%"
        >
          <Flex as={NextLink} href="/" passHref>
            <chakra.a alignItems="center" display="flex" title="Sword">
              <Logo />
            </chakra.a>
          </Flex>
          <HStack alignItems="center" display="flex" spacing={2}>
            <HStack display={{ base: "none", md: "inline-flex" }} spacing={2}>
              {NAV_ITEMS.map((item) => (
                <NavigationButton key={item.label + item.href} {...item} />
              ))}
            </HStack>
            {/*user !== undefined && <UserMenu />*/}
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                aria-label="Open menu"
                color="inherit"
                display={{ base: "flex", md: "none" }}
                fontSize="20px"
                icon={<IoMenuOutline />}
                onClick={mobileNav.onOpen}
                variant="ghost"
              />

              <VStack
                background="blackAlpha.900"
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                left={0}
                height="100vh"
                padding={2}
                paddingTop={24}
                position="absolute"
                right={0}
                rounded="none"
                spacing={1}
                top={0}
                zIndex={10}
              >
                <Logo />
                <IconButton
                  aria-label="Open menu"
                  color="inherit"
                  fontSize="20px"
                  icon={<IoCloseOutline />}
                  onClick={mobileNav.onClose}
                  variant="ghost"
                  width="full"
                />
                {NAV_ITEMS.map((item) => (
                  <NavigationButton
                    isMobile
                    closeMobile={mobileNav.onClose}
                    key={item.label + item.href}
                    {...item}
                  />
                ))}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
