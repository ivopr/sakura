import { Container, List, Title } from "@mantine/core";
import Head from "next/head";

import { Loader } from "../components/loader";
import { useGetAllCharactersQuery } from "../store/api/charaters";

export default function Characters(): JSX.Element {
  const { data, isFetching } = useGetAllCharactersQuery(null);

  return (
    <Container size="xs">
      <Head>
        <title>Characters &bull; Abyss</title>
      </Head>
      <Title>Characters</Title>

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
