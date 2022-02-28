import { Avatar, Box, Group, Paper, SimpleGrid, Tabs, Text, Title } from "@mantine/core";
import { staticInfo } from "@mantis/config";
import { useGetAccountByNameQuery } from "@mantis/store/apis/account";
import dayjs from "dayjs";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { IoAperture, IoIdCard, IoPeople, IoSettings } from "react-icons/io5";

type AccountPageProps = {
  name: string;
};

export default function Account({ name }: NextPage<AccountPageProps>): JSX.Element {
  const { data } = useGetAccountByNameQuery(name);
  const { status, data: sessionData } = useSession();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Head>
        <title>
          {name} - Accounts &bull; {staticInfo.serverName}
        </title>
      </Head>

      <Group mb="lg">
        <Avatar size="xl" src="https://placekitten.com/360/480">
          {name.charAt(0)}
        </Avatar>
        <Box>
          <Title>{name}</Title>
          <Text color="dimmed">{data?.account.email}</Text>
        </Box>
      </Group>

      <Tabs variant="pills" orientation="vertical">
        <Tabs.Tab label="Account" icon={<IoIdCard />}>
          <Group align="baseline" spacing="xs">
            <Title order={4}>Group: </Title>
            <Text>{data?.account.type}</Text>
          </Group>
          <Group align="baseline" spacing="xs">
            <Title order={4}>Premium: </Title>
            <Text color={data?.account.premium_ends_at === 0 ? "red" : "green"}>
              {data?.account.premium_ends_at === 0
                ? "Not activated"
                : `Ends in ${dayjs(data?.account.creation).format("DD/MM/YYYY HH:mm")}`}
            </Text>
          </Group>
          <Group align="baseline" spacing="xs">
            <Title order={4}>Total characters: </Title>
            <Text>{data?.account.players?.length}</Text>
          </Group>
          <Group align="baseline" spacing="xs">
            <Title order={4}>Created at: </Title>
            <Text>{dayjs(data?.account.creation).format("DD/MM/YYYY HH:mm")}</Text>
          </Group>
        </Tabs.Tab>
        <Tabs.Tab label="Characters" icon={<IoPeople />}>
          {data?.account.players?.map((character) => (
            <Paper shadow="md" padding="md" key={character.id + character.name}>
              <Title order={3}>{character.name}</Title>
              <SimpleGrid
                cols={6}
                breakpoints={[
                  { minWidth: "xl", cols: 6, spacing: "xl" },
                  { maxWidth: "lg", cols: 4, spacing: "lg" },
                  { maxWidth: "md", cols: 3, spacing: "md" },
                  { maxWidth: "sm", cols: 2, spacing: "sm" },
                  { maxWidth: "xs", cols: 1, spacing: "sm" },
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
                  <Title order={4}>Group: </Title>
                  <Text>{character.group_id}</Text>
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
            </Paper>
          ))}
        </Tabs.Tab>
        <Tabs.Tab label="Last Actions" icon={<IoAperture />}>
          Messages tab content
        </Tabs.Tab>
        {status === "authenticated" && sessionData?.user?.name === name && (
          <Tabs.Tab label="Settings" icon={<IoSettings />}>
            Settings tab content
          </Tabs.Tab>
        )}
      </Tabs>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      name: ctx.params?.name,
      session: await getSession(ctx),
    },
  };
};
