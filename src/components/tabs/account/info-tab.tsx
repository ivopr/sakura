import { HStack, Text, VStack } from "@chakra-ui/react";
import { SingleAccount } from "@sword/types/account";
import { DateTime } from "luxon";

type AccountInfoTabProps = {
  account: SingleAccount;
};

export function AccountInfoTab({ account }: AccountInfoTabProps): JSX.Element {
  const accountLabelSize = "lg";

  return (
    <VStack alignItems="flex-start" spacing="1.5">
      <HStack spacing="1.5">
        <Text marginRight="1.5" fontSize={accountLabelSize} fontWeight="semibold">
          Group
        </Text>
        <Text>{account.type}</Text>
      </HStack>
      <HStack spacing="1.5">
        <Text marginRight="1.5" fontSize={accountLabelSize} fontWeight="semibold">
          Premium
        </Text>
        <Text>
          {account.premium_ends_at !== 0
            ? `Premium ends in ${DateTime.fromSeconds(account.premium_ends_at).toLocaleString({
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}`
            : "Not Activated"}
        </Text>
      </HStack>
      <HStack spacing="1.5">
        <Text marginRight="1.5" fontSize={accountLabelSize} fontWeight="semibold">
          Total Characters
        </Text>
        <Text>{account.players && account.players.length > 0 ? account.players.length : 0}</Text>
      </HStack>
      <HStack spacing="1.5">
        <Text marginRight="1.5" fontSize={accountLabelSize} fontWeight="semibold">
          Created at
        </Text>
        <Text>
          {DateTime.fromSeconds(account.creation).toLocaleString({
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </HStack>
    </VStack>
  );
}
