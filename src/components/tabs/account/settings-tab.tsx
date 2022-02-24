import { Button, Heading, Icon, VStack } from "@chakra-ui/react";
import { SingleAccount } from "@sword/types/account";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { IoLogOutOutline } from "react-icons/io5";

type AccountSettingsTabProps = {
  account: SingleAccount;
};

export function AccountSettingsTab({ account }: AccountSettingsTabProps): JSX.Element {
  const router = useRouter();
  const translate = useTranslations("account.view.tabs.settingsTab");

  return (
    <VStack>
      <Button
        leftIcon={<Icon as={IoLogOutOutline} />}
        onClick={() => {
          signOut({
            redirect: false,
          });
          router.push("/");
        }}
      >
        {translate("logout")}
      </Button>
    </VStack>
  );
}
