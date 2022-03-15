import { Container, List, Text, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home(): JSX.Element {
  const commonTL = useTranslation("common");
  const indexTL = useTranslation("index");

  return (
    <Container size="xs">
      <Head>
        <title>
          {indexTL.t("title")} &bull; {commonTL.t("app-name")}
        </title>
      </Head>
      <Text align="center">{indexTL.t("this-is")}</Text>
      <Title
        align="center"
        sx={(theme) => ({
          color: theme.colors[theme.primaryColor][5],
        })}
      >
        {commonTL.t("app-name")}
      </Title>

      <Text my="sm">{indexTL.t("what-is-abyss")}</Text>

      <List>
        <List.Item>Mantine</List.Item>
        <List.Item>Next-i18next</List.Item>
        <List.Item>Next Auth</List.Item>
        <List.Item>Redux Toolkit</List.Item>
        <List.Item>Prisma</List.Item>
        <List.Item>Zod</List.Item>

        <List.Item>{indexTL.t("and-many-more")}</List.Item>
      </List>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", ["common", "index"])),
    },
  };
};
