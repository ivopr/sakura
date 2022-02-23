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
import { useTranslations } from "next-intl";
import React, { FC } from "react";

import { FunnyMenu } from "./side-menu.props";

type OptionProps = ContainerProps & {
  option: FunnyMenu;
  hasDivider?: boolean;
  layer: number;
  maxLayer?: number;
  fontSize?: string;
};

export const Option: FC<OptionProps> = ({
  option,
  hasDivider = false,
  layer,
  maxLayer = 3,
  fontSize = "lg",
}) => {
  const fontSizeArray = ["xs", "sm", "md", "lg", "xl"];
  const nextLayer = layer + 1;
  const nextFontSize = fontSizeArray[fontSizeArray.indexOf(fontSize) - 1];
  const translate = useTranslations("options");

  return (
    <>
      {option.childs ? (
        <Accordion width="100%" allowToggle>
          <AccordionItem border="none">
            <AccordionButton display="flex" width="full">
              <Heading fontSize={fontSize} textAlign="left">
                {translate(option.name)}
              </Heading>
              <AccordionIcon marginStart="2.5" />
            </AccordionButton>
            <AccordionPanel>
              {layer <= maxLayer &&
                option.childs.map((suboption, index) => (
                  <Option
                    option={suboption}
                    key={index}
                    layer={nextLayer}
                    fontSize={nextFontSize || "xs"}
                  />
                ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <Box alignSelf="self-start" width="100%">
          <Heading
            marginLeft="4"
            fontSize={fontSize}
            textAlign="left"
            _hover={{
              cursor: option.action ? "pointer" : "default",
            }}
            marginY="1"
            onClick={option.action}
          >
            {translate(option.name)}
          </Heading>
          {hasDivider && <Divider orientation="horizontal" />}
        </Box>
      )}
    </>
  );
};
