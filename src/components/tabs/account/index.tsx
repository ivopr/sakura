import { Divider, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { players } from "@prisma/client";
import { SingleAccount } from "@sword/types/account";
import { useSession } from "next-auth/react";
import {
  IoIdCardOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";

import { AccountCharactersTab } from "./characters-tab";
import { AccountInfoTab } from "./info-tab";
import { AccountSettingsTab } from "./settings-tab";

export type AccountTabsProps = {
  account: SingleAccount;
};

export function AccountTabs({ account }: AccountTabsProps): JSX.Element {
  const { data: session, status } = useSession();

  return (
    <Tabs marginY="5" variant="solid-rounded">
      <TabList justifyContent="center" flexWrap="wrap" gap="2.5">
        <Tab>
          <Icon as={IoIdCardOutline} marginRight="1" />
          Account
        </Tab>
        <Tab>
          <Icon as={IoPersonOutline} marginRight="1" />
          Characters
        </Tab>
        <Tab>
          <Icon as={IoPeopleOutline} marginRight="1" />
          Friends
        </Tab>
        {status === "authenticated" && account.id === session?.id && (
          <Tab>
            <Icon as={IoSettingsOutline} marginRight="1" />
            Settings
          </Tab>
        )}
      </TabList>
      <Divider marginY="2" />
      <TabPanels>
        <TabPanel>
          <AccountInfoTab account={account} />
        </TabPanel>
        <TabPanel>
          <AccountCharactersTab characters={account.players as players[]} />
        </TabPanel>
        <TabPanel></TabPanel>
        {status === "authenticated" && account.id === session?.id && (
          <TabPanel>
            <AccountSettingsTab account={account} />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
}
