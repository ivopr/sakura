import { Button, Icon as ChakraIcon } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { NavItem } from "./items";

export interface NavigationButtonProps extends NavItem {
  isMobile?: boolean;
  closeMobile?: () => void;
}

export function NavigationButton({
  isMobile = false,
  closeMobile,
  Icon,
  ...rest
}: NavigationButtonProps): JSX.Element {
  const { asPath } = useRouter();

  let isActive = false;

  if (asPath === rest.href) {
    isActive = true;
  }

  return (
    <NextLink href={rest.href ?? ""} passHref>
      <Button
        as="a"
        _hover={{
          color: "primary.500",
          backgroundColor: "transparent",
        }}
        _focus={{
          color: isActive ? "primary.400" : "",
        }}
        backgroundColor="transparent"
        color={isActive ? "primary.400" : ""}
        leftIcon={Icon && <ChakraIcon as={Icon} height="5" width="5" />}
        onClick={closeMobile ? () => closeMobile() : () => null}
        padding="2"
        variant="ghost"
        width={isMobile ? "full" : "auto"}
      >
        {rest.label}
      </Button>
    </NextLink>
  );
}
