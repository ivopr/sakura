import {
  Anchor,
  Button,
  Container,
  Divider,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BrandGoogle, UserPlus } from "tabler-icons-react";
import { z } from "zod";

import { withSSRGuest } from "../hocs/with-ssr-guest";

const RegisterSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "What is your email?" })
    .email({ message: "This must be a valid email" }),
  password: z
    .string()
    .nonempty({ message: "You surely set a password when creating your account" })
    .min(5, { message: "Your password must be at least 5 characters long" }),
});

export default function Register(): JSX.Element {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    schema: zodResolver(RegisterSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const commonTL = useTranslation("common");
  const registerTL = useTranslation("register");

  const onSubmit = form.onSubmit(async ({ email, password }) => {
    // Handle your credentials register here
    console.log({ email, password });
  });

  return (
    <Container size="xs">
      <Head>
        <title>
          {registerTL.t("title")} &bull; {commonTL.t("app-name")}
        </title>
      </Head>
      <Title align="center">{registerTL.t("title")}</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {registerTL.t("is-registered")}
        <NextLink href="/login" passHref>
          <Anchor<"a"> size="sm">{registerTL.t("login")}</Anchor>
        </NextLink>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Button
          color="blue"
          fullWidth
          leftIcon={<BrandGoogle size={18} />}
          onClick={() => signIn("google", { redirect: false })}
        >
          {registerTL.t("with-google")}
        </Button>
        <Divider mt="sm" label={registerTL.t("or-with")} labelPosition="center" />
        <form onSubmit={onSubmit}>
          <TextInput
            disabled
            label={registerTL.t("fields.email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            disabled
            mt="md"
            label={registerTL.t("fields.password")}
            {...form.getInputProps("password")}
          />
          <Button disabled type="submit" leftIcon={<UserPlus size={18} />} fullWidth mt="xl">
            {registerTL.t("title")}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", ["common", "register"])),
    },
  };
});
