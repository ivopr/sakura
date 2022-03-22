import { Box, Group, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { players } from "@prisma/client";
import NextLink from "next/link";

type PlayerCardProps = {
  character: players;
};

export function PlayerCard({ character }: PlayerCardProps): JSX.Element {
  return (
    <NextLink href={`/players/${character.name}`} passHref>
      <Paper
        component="a"
        key={character.id + character.name}
        my="xs"
        p="md"
        shadow="md"
        sx={(theme) => ({
          alignItems: "center",
          backgroundColor: theme.colorScheme === "light" ? theme.white : theme.colors.gray[9],
          display: "flex",
          transition: "0.2s ease-in-out",
          [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
          },
          ":hover": {
            backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.3),
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
          <Title order={3}>{character.name}</Title>
          <SimpleGrid
            breakpoints={[
              { maxWidth: "xs", cols: 1 },
              { maxWidth: "md", cols: 2 },
              { minWidth: "md", cols: 3 },
            ]}
          >
            <Group align="baseline" spacing="xs">
              <Title order={4}>Level: </Title>
              <Text>{character.level}</Text>
            </Group>
            <Group align="baseline" spacing="xs">
              <Title order={4}>Vocation: </Title>
              <Text>{character.vocation}</Text>
            </Group>
            <Group align="baseline" spacing="xs">
              <Title order={4}>Gender: </Title>
              <Text>{character.sex}</Text>
            </Group>
            <Group align="baseline" spacing="xs">
              <Title order={4}>Magic Level: </Title>
              <Text>{character.maglevel}</Text>
            </Group>
            <Group align="baseline" spacing="xs">
              <Title order={4}>Stamina: </Title>
              <Text>{character.stamina}</Text>
            </Group>
            <Group align="baseline" spacing="xs">
              <Title order={4}>Group: </Title>
              <Text>{character.group_id}</Text>
            </Group>
          </SimpleGrid>
        </Box>
      </Paper>
    </NextLink>
  );
}
