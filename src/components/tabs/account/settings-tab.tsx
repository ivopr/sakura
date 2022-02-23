import { Heading, VStack } from "@chakra-ui/react";
import { SingleAccount } from "@sword/types/account";
import { useTranslations } from "next-intl";

type AccountSettingsTabProps = {
  account: SingleAccount;
};

export function AccountSettingsTab({ account }: AccountSettingsTabProps): JSX.Element {
  const translate = useTranslations("account.view.tabs.settingsTab");

  return (
    <VStack>
      <Heading>Some settings will go here</Heading>
    </VStack>
  );
}
