import { Box, Group, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { players } from "@prisma/client";
import NextLink from "next/link";

type PlayerCardProps = {
  player: players;
};

export function PlayerCard({ player }: PlayerCardProps): JSX.Element {
  return (
    <NextLink href={`/players/${player.name}`} passHref>
      <Paper
        component="a"
        key={player.id + player.name}
        my="xs"
        p="md"
        shadow="md"
        sx={(theme) => ({
          alignItems: "center",
          backgroundColor: theme.colorScheme === "light" ? theme.white : theme.colors.gray[9],
          display: "flex",
          [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
          },
          ":hover": {
            backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.3),
            transition: "0.25s ease-in-out",
          },
        })}
      >
        {/* <DemonicatIcon /> */}
        <Box
          sx={(theme) => ({
            marginLeft: theme.spacing.xs,
            width: "100%",
          })}
        >
          <Title order={3}>{player.name}</Title>
          <SimpleGrid
            breakpoints={[
              { maxWidth: "xs", cols: 1 },
              { maxWidth: "md", cols: 2 },
              { minWidth: "md", cols: 3 },
            ]}
          >
            <Group align="baseline" spacing="xs">
              <Title order={4}>Level: </Title>
              <Text>{player.level}</Text>
            </Group>
            <Group align="baseline" spacing="xs">
              <Title order={4}>Vocation: </Title>
              <Text>{player.vocation}</Text>
            </Group>
            <Group align="baseline" spacing="xs">
              <Title order={4}>Gender: </Title>
              <Text>{player.sex}</Text>
            </Group>
            <Group align="baseline" spacing="xs">
              <Title order={4}>Magic Level: </Title>
              <Text>{player.maglevel}</Text>
            </Group>
            <Group align="baseline" spacing="xs">
              <Title order={4}>Stamina: </Title>
              <Text>{player.stamina}</Text>
            </Group>
            <Group align="baseline" spacing="xs">
              <Title order={4}>Group: </Title>
              <Text>{player.group_id}</Text>
            </Group>
          </SimpleGrid>
        </Box>
      </Paper>
    </NextLink>
  );
}
