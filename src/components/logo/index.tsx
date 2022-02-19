import { Heading, HStack, Icon } from "@chakra-ui/react";
import { CrumpledPaperIcon } from "@radix-ui/react-icons";

export function Logo(): JSX.Element {
  return (
    <HStack>
      <Icon as={CrumpledPaperIcon} height="10" width="10" />
      <Heading>Sword</Heading>
    </HStack>
  );
}
