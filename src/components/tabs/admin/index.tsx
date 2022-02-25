import { Divider, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { SingleAccount } from "@sword/types/account";
import { IoIdCardOutline } from "react-icons/io5";

import { AdminDashboardRecentlyCreatedAccountsTab } from "./recently-created-accounts-tab";

export type AdminDashboardTabsProps = {
  accounts: SingleAccount[];
};

export function AdminDashboardTabs({ accounts }: AdminDashboardTabsProps): JSX.Element {
  return (
    <Tabs marginY="5" variant="solid-rounded">
      <TabList justifyContent="center" flexWrap="wrap" gap="2.5">
        <Tab>
          <Icon as={IoIdCardOutline} marginRight="1" />
          Recently Created Accounts
        </Tab>
      </TabList>
      <Divider marginY="2" />
      <TabPanels>
        <TabPanel>
          <AdminDashboardRecentlyCreatedAccountsTab accounts={accounts} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
