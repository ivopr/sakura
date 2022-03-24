import { Container, ContainerProps, Loader as MantineLoader } from "@mantine/core";
import Head from "next/head";
import { useTranslation } from "next-i18next";

export function Loader({ ...rest }: ContainerProps): JSX.Element {
  const commonTL = useTranslation("common");

  return (
    <Container sx={{ display: "flex" }} {...rest}>
      <Head>
        <title>
          {commonTL.t("loading")} &bull; {commonTL.t("app-name")}
        </title>
      </Head>
      <MantineLoader size="xl" sx={{ margin: "auto" }} />
    </Container>
  );
}
