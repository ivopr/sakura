import {
  createStyles,
  Navbar as MantineNavbar,
  NavbarProps as MantineNavbarProps,
  ScrollArea,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";
import { Home, User, Users } from "tabler-icons-react";

import { LinksGroup } from "./links-group";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingBottom: 0,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingTop: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: 0,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function Navbar({ ...rest }: Omit<MantineNavbarProps, "children">): JSX.Element {
  const { status } = useSession();

  const mockdata = [
    { label: "Home", icon: Home, link: "/" },
    { label: "Characters", icon: Users, link: "/characters" },
    {
      label: "Account",
      initiallyOpened: false,
      icon: User,
      links:
        status === "authenticated"
          ? [{ label: "My Account", link: "/account" }]
          : [
              { label: "Login", link: "/login" },
              { label: "Register", link: "/register" },
            ],
    },
  ];

  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <MantineNavbar className={classes.navbar} {...rest}>
      <MantineNavbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
