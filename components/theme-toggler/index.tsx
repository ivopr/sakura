import {
  Box,
  Center,
  ColorScheme,
  Group,
  SegmentedControl,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { Moon, Sun } from "tabler-icons-react";

export function ThemeToggler(): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center" my="xl" ml="auto">
      <SegmentedControl
        value={colorScheme}
        onChange={(val) => toggleColorScheme(val as ColorScheme)}
        data={[
          {
            value: "light",
            label: (
              <Center>
                <Sun size={16} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <Moon size={16} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}
