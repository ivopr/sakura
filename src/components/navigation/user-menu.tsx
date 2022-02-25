import {
  Avatar,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import {
  IoAddOutline,
  IoBuildOutline,
  IoChevronDownOutline,
  IoLogOutOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

export function UserMenu(): JSX.Element {
  const router = useRouter();
  const { data } = useSession();

  return (
    <Menu autoSelect={false} isLazy>
      <MenuButton
        as={Button}
        padding="2"
        iconSpacing="0"
        leftIcon={
          <Avatar
            marginRight="2"
            name={data?.user?.name as string}
            size="xs"
            src="https://github.com/ivopr.png"
          />
        }
        rightIcon={<Icon as={IoChevronDownOutline} marginLeft="2" />}
        size="sm"
        variant="ghost"
      >
        {data?.user?.name}
      </MenuButton>
      <MenuList>
        {Number(data?.groupId) > -1 && (
          <MenuGroup title="Administration">
            <MenuItem onClick={() => router.push("/admin/dashboard")}>
              <Icon as={IoBuildOutline} marginRight="1" />
              Admin Panel
            </MenuItem>
          </MenuGroup>
        )}

        <MenuGroup title="My Account">
          <MenuItem onClick={() => router.push("/account")}>
            <Icon as={IoPersonCircleOutline} marginRight="1" />
            My Profile
          </MenuItem>
          <MenuItem onClick={() => router.push("/account/create-character")}>
            <Icon as={IoAddOutline} marginRight="1" />
            Create Character
          </MenuItem>
          <MenuItem
            onClick={() =>
              signOut({
                redirect: false,
              })
            }
          >
            <Icon as={IoLogOutOutline} marginRight="1" />
            Log out
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
