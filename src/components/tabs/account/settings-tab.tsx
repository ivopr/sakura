import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, VStack } from "@chakra-ui/react";
import { DeleteAccountModal } from "@sword/components/modals/delete-account";
import { SingleAccount } from "@sword/types/account";
import { useTranslations } from "next-intl";

type AccountSettingsTabProps = {
  account: SingleAccount;
};

export function AccountSettingsTab({ account }: AccountSettingsTabProps): JSX.Element {
  const translate = useTranslations("account.view.tabs.settingsTab");

  if (!account) return <></>;

  return (
    <VStack>
      <Alert flexDirection="column" alignItems="center" status="error" variant="left-accent">
        <Box
          justifyContent="space-between"
          marginY={{
            base: "2.5",
            md: "0",
          }}
          flexDirection={{
            base: "column",
            md: "row",
          }}
          display="flex"
        >
          <AlertIcon boxSize="40px" marginRight="2.5" />
          <Box marginBottom="2.5">
            <AlertTitle
              fontSize="lg"
              textAlign={{
                base: "center",
                md: "left",
              }}
            >
              {translate("delete.title")}
            </AlertTitle>
            <AlertDescription maxWidth="xs">{translate("delete.content")}</AlertDescription>
          </Box>
        </Box>
        <DeleteAccountModal accountId={account.id} accountName={account.name} />
      </Alert>
    </VStack>
  );
}
