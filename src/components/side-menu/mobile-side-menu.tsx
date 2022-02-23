import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  ContainerProps,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React, { FC } from "react";

export const MobileSideMenu: FC<ContainerProps> = ({ children, display }) => {
  return (
    <Accordion display={display} width="100%" allowToggle>
      <AccordionItem width="100%" border="none">
        <AccordionButton justifyContent="center">
          <Heading textAlign="center">Menu</Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <VStack spacing="1.5">{children}</VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
