import { ContainerProps } from "@chakra-ui/react";

export type FunnyMenu = {
  name: string;
  childs?: FunnyMenu[];
  action?: () => void;
};

export type SideMenuProps = ContainerProps & {
  options: FunnyMenu[];
};
