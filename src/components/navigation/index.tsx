import {
  Avatar,
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  HStack,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { IoMenuOutline, IoNotificationsOutline } from "react-icons/io5";

import { Logo } from "../logo";
import { NAV_ITEMS } from "./items";

export function Navigation(): JSX.Element {
  const { status } = useSession();
  const bg = useColorModeValue("white", "gray.900");
  const mobileNav = useDisclosure();

  return (
    <Box position="sticky" zIndex="sticky" top="0" shadow="md">
      <chakra.header
        backgroundColor={bg}
        borderColor="gray.600"
        borderBottomWidth={1}
        width="full"
        paddingX={{ base: 2, sm: 4 }}
      >
        <Flex alignItems="center" justifyContent="space-between" height="24" marginX="auto">
          <HStack alignItems="center" display="flex" spacing={1}>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                color={useColorModeValue("gray.800", "inherit")}
                fontSize="20px"
                aria-label="Open menu"
                icon={<IoMenuOutline />}
                onClick={mobileNav.onOpen}
                variant="ghost"
              />
              <VStack
                position="absolute"
                top={0}
                right={0}
                left={0}
                flexDirection="column"
                display={mobileNav.isOpen ? "flex" : "none"}
                padding={2}
                shadow="sm"
                backgroundColor={bg}
                paddingBottom={4}
                rounded="sm"
                spacing="2.5"
              >
                <CloseButton
                  justifySelf="self-start"
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                {NAV_ITEMS.map((item) => {
                  if (item.onlyAuth && status !== "authenticated") return;
                  if (item.onlyGuest && status === "authenticated") return;

                  return (
                    <NextLink key={item.label + item.href} href={item.href} passHref>
                      <Button
                        as="a"
                        width="full"
                        leftIcon={<Icon as={item.Icon} />}
                        variant="ghost"
                      >
                        {item.label}
                      </Button>
                    </NextLink>
                  );
                })}
              </VStack>
            </Box>
            <chakra.a href="/" title="Sword Home Page" display="flex" alignItems="center">
              <Logo />
              <VisuallyHidden>Sword</VisuallyHidden>
            </chakra.a>
          </HStack>
          <HStack alignItems="center" display="flex" spacing={3}>
            <HStack display={{ base: "none", md: "inline-flex" }} spacing={3}>
              {NAV_ITEMS.map((item) => {
                if (item.onlyAuth && status !== "authenticated") return;
                if (item.onlyGuest && status === "authenticated") return;

                return (
                  <NextLink key={item.label + item.href} href={item.href} passHref>
                    <Button as="a" leftIcon={<Icon as={item.Icon} />} size="sm" variant="ghost">
                      {item.label}
                    </Button>
                  </NextLink>
                );
              })}
            </HStack>
            <chakra.a
              padding={3}
              cursor="pointer"
              color={useColorModeValue("gray.800", "inherit")}
              rounded="sm"
              _hover={{ color: useColorModeValue("gray.800", "gray.600") }}
            >
              <IoNotificationsOutline />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>

            <Avatar name="Dan Abrahmov" size="sm" src="https://bit.ly/dan-abramov" />
          </HStack>
        </Flex>
      </chakra.header>
    </Box>
  );
}
