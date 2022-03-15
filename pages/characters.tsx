import { Container, List, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Loader } from "../components/loader";
import { useGetAllCharactersQuery } from "../store/api/charaters";

export default function Characters(): JSX.Element {
  const { data, isFetching } = useGetAllCharactersQuery(null);
  const charactersTL = useTranslation("characters");
  const commonTL = useTranslation("common");

  return (
    <Container size="xs">
      <Head>
        <title>
          {charactersTL.t("title")} &bull; {commonTL.t("app-name")}
        </title>
      </Head>
      <Title>{charactersTL.t("title")}</Title>

      {isFetching ? (
        <Loader my="md" />
      ) : (
        <List my="md">
          {data?.map((item) => (
            <List.Item key={item.name}>{item.name}</List.Item>
          ))}
        </List>
      )}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", ["characters", "common"])),
    },
  };
};
