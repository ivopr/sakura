import { BoxProps, HeadingProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type SimpleCardProps = {
  title: string;
  titleStyle?: HeadingProps;
  containerStyle?: BoxProps;
  children: ReactNode;
};
