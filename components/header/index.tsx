import {
  Burger,
  Header as MantineHeader,
  HeaderProps as MantineHeaderProps,
  MediaQuery,
  Title,
  useMantineTheme,
} from "@mantine/core";
import NextNProgress from "nextjs-progressbar";
import { Dispatch, SetStateAction } from "react";

import { ThemeToggler } from "../theme-toggler";

export type HeaderProps = Omit<MantineHeaderProps, "children"> & {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};

export function Header({ isOpened, setIsOpened, ...rest }: HeaderProps): JSX.Element {
  const theme = useMantineTheme();

  return (
    <MantineHeader p="md" {...rest}>
      <NextNProgress
        options={{ showSpinner: false }}
        color={theme.colors[theme.primaryColor][5]}
        startPosition={0.5}
        stopDelayMs={100}
        height={5}
      />
      {/* Handle other responsive styles with MediaQuery component or createStyles function */}
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={isOpened}
            onClick={() => setIsOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="md"
          />
        </MediaQuery>
        <Title>Abyss</Title>
        <ThemeToggler />
      </div>
    </MantineHeader>
  );
}
