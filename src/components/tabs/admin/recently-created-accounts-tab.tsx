import { VStack } from "@chakra-ui/react";
import { AdminAccountCard } from "@sword/components/admin/account-card";
import { SingleAccount } from "@sword/types/account";
import { useRouter } from "next/router";

type AdminDashboardRecentlyCreatedAccountsTabProps = {
  accounts: SingleAccount[];
};

export function AdminDashboardRecentlyCreatedAccountsTab({
  accounts,
}: AdminDashboardRecentlyCreatedAccountsTabProps): JSX.Element {
  const router = useRouter();

  return (
    <VStack>
      {accounts.map((account) => (
        <AdminAccountCard key={account.id + account.name} account={account} />
      ))}
    </VStack>
  );
}
