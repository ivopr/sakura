import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, VStack } from "@chakra-ui/react";
import { DeleteAccountModal } from "@sword/components/modals/delete-account";
import { SingleAccount } from "@sword/types/account";
import { useTranslations } from "next-intl";
type AccountSettingsTabProps = {
  account: SingleAccount;
};

export function AccountSettingsTab({ account }: AccountSettingsTabProps): JSX.Element {
  const translate = useTranslations("account.view.tabs.settingsTab");

  return (
    <VStack>
      <Alert alignItems="center" flexDirection="column" status="error" variant="left-accent">
        <Box
          justifyContent="space-between"
          flexDirection={{
            base: "column",
            md: "row",
          }}
          display="flex"
          marginY={{
            base: "2.5",
            md: "0",
          }}
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
