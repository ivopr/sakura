import { HStack, Text, VStack } from "@chakra-ui/react";
import { SingleAccount } from "@sword/types/account";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";

type AccountInfoTabProps = {
  account: SingleAccount;
};

export function AccountInfoTab({ account }: AccountInfoTabProps): JSX.Element {
  const translate = useTranslations("account.view.tabs.accountTab");

  const accountLabelSize = "lg";

  return (
    <VStack alignItems="flex-start" spacing="1.5">
      <HStack spacing="1.5">
        <Text marginRight="1.5" fontSize={accountLabelSize} fontWeight="semibold">
          {translate("group")}
        </Text>
        <Text>{account.type}</Text>
      </HStack>
      <HStack spacing="1.5">
        <Text marginRight="1.5" fontSize={accountLabelSize} fontWeight="semibold">
          {translate("premium")}
        </Text>
        <Text>
          {account.premium_ends_at !== 0
            ? translate("premiumEnds", {
                date: DateTime.fromSeconds(account.premium_ends_at).toLocaleString({
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }),
              })
            : translate("notPremium")}
        </Text>
      </HStack>
      <HStack spacing="1.5">
        <Text marginRight="1.5" fontSize={accountLabelSize} fontWeight="semibold">
          {translate("totalCharacters")}
        </Text>
        <Text>{account.players && account.players.length > 0 ? account.players.length : 0}</Text>
      </HStack>
      <HStack spacing="1.5">
        <Text marginRight="1.5" fontSize={accountLabelSize} fontWeight="semibold">
          {translate("createdAt")}
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
