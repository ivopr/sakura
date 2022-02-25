import {
  Avatar,
  Button,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { IoAddOutline, IoChevronDownOutline, IoLogOutOutline } from "react-icons/io5";

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
            src="https://bit.ly/dan-abramov"
          />
        }
        rightIcon={<Icon as={IoChevronDownOutline} marginLeft="2" />}
        size="sm"
        variant="ghost"
      >
        {data?.user?.name}
      </MenuButton>
      <MenuList>
        <MenuItem minHeight="48px">
          <Image
            boxSize="2rem"
            marginRight="12px"
            borderRadius="full"
            alt="Fluffybuns the destroyer"
            src="https://placekitten.com/100/100"
          />
          <span>Fluffybuns the Destroyer</span>
        </MenuItem>
        <MenuItem minHeight="40px">
          <Image
            boxSize="2rem"
            marginRight="12px"
            borderRadius="full"
            alt="Simon the pensive"
            src="https://placekitten.com/120/120"
          />
          <span>Simon the pensive</span>
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
      </MenuList>
    </Menu>
  );
}
