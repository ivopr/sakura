import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ContainerProps,
  Divider,
  Heading,
} from "@chakra-ui/react";
import React, { FC } from "react";

import { FunnyMenu } from "./side-menu.props";

type OptionProps = ContainerProps & {
  option: FunnyMenu;
  hasDivider?: boolean;
};

export const Option: FC<OptionProps> = ({ option, hasDivider = false, ...rest }) => {
  return (
    <>
      {option.childs ? (
        <Accordion allowToggle width="full">
          <AccordionItem>
            <AccordionButton display="flex" width="full">
              <Heading fontSize="xl" textAlign="center">
                {option.name}
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {option.childs.map((suboption, index) => (
                <Heading marginStart="3" fontSize="md" key={index}>
                  {suboption.name}
                </Heading>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <Box alignSelf="self-start" width="full">
          <Heading textAlign="center" marginY="1" marginRight="3.5" fontSize="xl">
            {option.name}
          </Heading>
          {hasDivider && <Divider orientation="horizontal" />}
        </Box>
      )}
    </>
  );
};
