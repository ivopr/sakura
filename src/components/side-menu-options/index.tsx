import { VStack } from "@chakra-ui/react";
import React, { FC } from "react";

import { MobileSideMenu } from "./mobile-side-menu";
import { SideMenuProps } from "./side-menu.props";
import { Option } from "./side-menu-options";

export const SideMenu: FC<SideMenuProps> = ({ options }): JSX.Element => {
  return (
    <>
      {/* Desktop Menu */}
      <VStack width="100%" maxW="xs" display={{ base: "none", md: "flex" }}>
        {options.map((option, index) => (
          <Option option={option} key={index} layer={1} />
        ))}
      </VStack>
      {/* Desktop Menu */}
      <MobileSideMenu width="100%" display={{ base: "flex", md: "none" }}>
        {options.map((option, index) => (
          <Option option={option} key={index} layer={1} />
        ))}
      </MobileSideMenu>
    </>
  );
};
