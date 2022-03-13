import { Container, ContainerProps, Loader as MantineLoader } from "@mantine/core";
import Head from "next/head";

export function Loader({ ...rest }: ContainerProps): JSX.Element {
  return (
    <Container sx={{ display: "flex" }} {...rest}>
      <Head>
        <title>Loading &bull; Abyss</title>
      </Head>
      <MantineLoader size="xl" sx={{ margin: "auto" }} />
    </Container>
  );
}
