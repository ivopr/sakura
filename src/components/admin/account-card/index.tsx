import { Box, Flex, Heading, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { SingleAccount } from "@sword/types/account";
import { IoPencilOutline } from "react-icons/io5";

type AdminAccountCardProps = {
  account: SingleAccount;
};

export function AdminAccountCard({ account }: AdminAccountCardProps): JSX.Element {
  return (
    <Flex
      justifyContent="space-between"
      width="full"
      height="36"
      padding="2.5"
      background="gray.900"
      borderRadius="md"
    >
      <Box>
        <Heading>{account.name}</Heading>
        <Text>{account.type}</Text>
      </Box>
      <HStack>
        <IconButton aria-label="Edit account" icon={<Icon as={IoPencilOutline} />} />
      </HStack>
    </Flex>
  );
}
