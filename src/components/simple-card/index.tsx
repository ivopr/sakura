import { Box, Divider, Heading, useColorModeValue } from "@chakra-ui/react";
import React, { FC } from "react";

import { SimpleCardProps } from "./simple-card.props";

export const SimpleCard: FC<SimpleCardProps> = ({
  children,
  containerStyle,
  title,
  titleStyle,
}) => {
  const cardBg = useColorModeValue("gray.200", "gray.900");
  const dividerColor = useColorModeValue("gray.300", "gray.700");
  const textColor = useColorModeValue("blue.300", "blue.700");

  return (
    <Box
      justifyContent="left"
      width="full"
      maxWidth="xs"
      borderRadius="xl"
      backgroundColor={cardBg}
      {...containerStyle}
    >
      <Heading padding="5" color={textColor} {...titleStyle}>
        {title}
      </Heading>
      <Divider backgroundColor={dividerColor} />
      {children}
    </Box>
  );
};
