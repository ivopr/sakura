import { VStack } from "@chakra-ui/react";
import React, { FC } from "react";

import { SideMenuProps } from "./side-menu.props";
import { Option } from "./side-menu-options";

export const SideMenu: FC<SideMenuProps> = ({ options }): JSX.Element => {
  return (
    <VStack width="100%">
      {options.map((option, index) => (
        <Option option={option} key={index} layer={1} />
      ))}
    </VStack>
  );
};
