import { Heading, HStack, Icon } from "@chakra-ui/react";
import { IoWaterOutline } from "react-icons/io5";

export function Logo(): JSX.Element {
  return (
    <HStack>
      <Icon as={IoWaterOutline} height="10" width="10" />
      <Heading>Sword</Heading>
    </HStack>
  );
}
