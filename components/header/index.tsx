import {
  Box,
  Burger,
  Group,
  Header as MantineHeader,
  HeaderProps as MantineHeaderProps,
  MediaQuery,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import { Dispatch, SetStateAction } from "react";
import { Plant2 } from "tabler-icons-react";

import { ThemeToggler } from "../theme-toggler";

export type HeaderProps = Omit<MantineHeaderProps, "children"> & {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};

export function Header({ isOpened, setIsOpened, ...rest }: HeaderProps): JSX.Element {
  const commonTL = useTranslation("common");
  const router = useRouter();
  const theme = useMantineTheme();

  const goToHome = (): Promise<boolean> => router.push("/");

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
        <Group
          sx={{
            borderRadius: theme.radius.md,
            cursor: "pointer",
            paddingLeft: theme.spacing.xs,
            paddingRight: theme.spacing.xs,
            transition: "0.2s ease-in-out",
            ":hover": {
              backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.2),
            },
          }}
          onClick={goToHome}
        >
          <ThemeIcon variant="light" size={30}>
            <Plant2 size={18} />
          </ThemeIcon>
          <Title>{commonTL.t("app-name")}</Title>
        </Group>
        <Box
          sx={{
            marginLeft: "auto",
            [theme.fn.smallerThan("xs")]: {
              display: "none",
            },
          }}
        >
          <ThemeToggler />
        </Box>
      </div>
    </MantineHeader>
  );
}
