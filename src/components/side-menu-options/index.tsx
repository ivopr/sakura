import { Box, Heading, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

import { FunnyMenu, SideMenuProps } from "./side-menu.props";
import { Option } from "./side-menu-options";

export const SideMenu: FC<SideMenuProps> = ({ options, ...rest }): JSX.Element => {
  return (
    <VStack width="100%">
      {options.map((option, index) => (
        <Option option={option} key={index} hasDivider={options.length !== index + 1} />
      ))}
    </VStack>
  );
};
