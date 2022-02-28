import {
  ActionIcon,
  Burger,
  Header as MantineHeader,
  HeaderProps as MantineHeaderProps,
  MediaQuery,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const Logo = dynamic<unknown>(() => import("../logo").then((mod) => mod.Logo), {
  ssr: false,
});

export type HeaderProps = Omit<MantineHeaderProps, "children"> & {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
};

export function Header({ isOpened, setIsOpened, ...rest }: HeaderProps): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <MantineHeader padding="md" {...rest}>
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
        <Logo />
        <ActionIcon size="xl" ml="auto" onClick={() => toggleColorScheme()}>
          {colorScheme === "light" ? <IoMoonOutline size={20} /> : <IoSunnyOutline size={20} />}
        </ActionIcon>
      </div>
    </MantineHeader>
  );
}
