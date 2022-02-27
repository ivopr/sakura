import { Button as MantineButton, ButtonProps as MantineButtonProps } from "@mantine/core";

type ButtonProps = MantineButtonProps<"a">;

export function Button({ children, sx, ...rest }: ButtonProps): JSX.Element {
  return (
    <MantineButton
      component="a"
      sx={(theme) => ({
        ...sx,
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
      })}
      {...rest}
    >
      {children}
    </MantineButton>
  );
}
