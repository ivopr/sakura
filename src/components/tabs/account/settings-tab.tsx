import { Button, Icon, VStack } from "@chakra-ui/react";
import { SingleAccount } from "@sword/types/account";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

type AccountSettingsTabProps = {
  account: SingleAccount;
};

export function AccountSettingsTab({ account }: AccountSettingsTabProps): JSX.Element {
  const router = useRouter();

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
        Log out
      </Button>
    </VStack>
  );
}
