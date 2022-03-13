import { Container, List, Text, Title } from "@mantine/core";
import Head from "next/head";

export default function HomePage(): JSX.Element {
  return (
    <Container size="xs">
      <Head>
        <title>Home &bull; Abyss</title>
      </Head>
      <Text align="center">
        This is{" "}
        <Title
          sx={(theme) => ({
            color: theme.colors[theme.primaryColor][5],
          })}
        >
          Abyss
        </Title>
      </Text>

      <Text my="sm">
        Abyss is my personal Next.js template filled with the things I&apos;ve grown accostumed to,
        that includes, but isn&apos;t limited to:
      </Text>

      <List>
        <List.Item>Mantine</List.Item>
        <List.Item>Next Auth</List.Item>
        <List.Item>Redux Toolkit</List.Item>
        <List.Item>Prisma</List.Item>
        <List.Item>Zod</List.Item>

        <List.Item>
          ...and many more incredible open source things that make my day easier
        </List.Item>
      </List>
    </Container>
  );
}
