import {
  Accordion,
  Divider,
  Navbar as MantineNavbar,
  NavbarProps as MantineNavbarProps,
  ScrollArea,
  ThemeIcon,
} from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { IoBeaker, IoBook, IoDesktop, IoLogOut, IoPersonSharp } from "react-icons/io5";

import { Button } from "../button";
import { ButtonLink } from "../button-link";
import { Copyright } from "./copyright";
import { ExperimentalSection, GeneralSection, LibrarySection } from "./sections";

export type NavbarProps = Omit<MantineNavbarProps, "children">;

export function Navbar({ ...rest }: NavbarProps): JSX.Element {
  const { status, data } = useSession();

  return (
    <MantineNavbar {...rest}>
      <MantineNavbar.Section grow component={ScrollArea}>
        <Accordion
          iconPosition="right"
          initialItem={1}
          styles={(theme) => ({
            control: {
              borderRadius: theme.radius.sm,
            },
            content: {
              marginLeft: "auto",
              width: "95%",
            },
            contentInner: {
              paddingLeft: 0,
              paddingRight: 0,
            },
            item: {
              borderBottom: "none",
            },
          })}
        >
          <Accordion.Item
            label={
              <>
                <ThemeIcon
                  mr="xs"
                  color={
                    status === "authenticated" ? "green" : status === "loading" ? "blue" : "gray"
                  }
                  variant="light"
                  size="lg"
                >
                  <IoPersonSharp />
                </ThemeIcon>
                {status === "authenticated" ? data?.user?.name : "Account"}
              </>
            }
          >
            {status === "authenticated" ? (
              <>
                <ButtonLink href="/account">Profile</ButtonLink>
                <ButtonLink href="/account/create-character">Create Character</ButtonLink>
                <ButtonLink href="/account/settings">Settings</ButtonLink>
                <Button leftIcon={<IoLogOut />} onClick={() => signOut({ redirect: false })}>
                  Logout
                </Button>
              </>
            ) : status === "loading" ? (
              <Button>Loading...</Button>
            ) : (
              <>
                <ButtonLink href="/account/login">Login</ButtonLink>
                <ButtonLink href="/account/create">Register</ButtonLink>
              </>
            )}
          </Accordion.Item>
          <Accordion.Item
            label={
              <>
                <ThemeIcon mr="xs" color="violet" variant="light" size="lg">
                  <IoDesktop />
                </ThemeIcon>
                General
              </>
            }
          >
            <GeneralSection />
          </Accordion.Item>

          <Accordion.Item
            label={
              <>
                <ThemeIcon mr="xs" color="violet" variant="light" size="lg">
                  <IoBook />
                </ThemeIcon>
                Library
              </>
            }
          >
            <LibrarySection />
          </Accordion.Item>

          <Accordion.Item
            label={
              <>
                <ThemeIcon mr="xs" color="violet" variant="light" size="lg">
                  <IoBeaker />
                </ThemeIcon>
                Experimental
              </>
            }
          >
            <ExperimentalSection />
          </Accordion.Item>
        </Accordion>
      </MantineNavbar.Section>
      {/* Last section with normal height (depends on section content) */}
      <MantineNavbar.Section>
        <Divider my="xs" />
        <Copyright />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
