import { Button as MantineButton, ButtonProps as MantineButtonProps } from "@mantine/core";
import NextLink from "next/link";

type ButtonLinkProps = MantineButtonProps<"a"> & {
  href: string;
};

export function ButtonLink({ children, href, sx, ...rest }: ButtonLinkProps): JSX.Element {
  return (
    <NextLink href={href} passHref>
      <MantineButton
        component="a"
        sx={(theme) => ({
          alignItems: "center",
          backgroundColor: theme.colorScheme === "light" ? theme.white : theme.colors.dark["7"],
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === "light" ? theme.colors.dark["4"] : theme.white,
          display: "flex",
          height: 56,
          paddingLeft: 12,
          paddingRight: 12,
          width: "100%",

          ":hover": {
            backgroundColor:
              theme.colorScheme === "light" ? theme.colors.gray["1"] : theme.colors.gray["9"],
          },
          ...sx,
        })}
        {...rest}
      >
        {children}
      </MantineButton>
    </NextLink>
  );
}
