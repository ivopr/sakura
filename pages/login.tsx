import {
  Anchor,
  Button,
  Checkbox,
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
import { BrandGoogle, Login as LoginIcon } from "tabler-icons-react";
import { z } from "zod";

import { withSSRGuest } from "../hocs/with-ssr-guest";

const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "What is your account name?" })
    .email({ message: "This email is invalid" }),
  password: z
    .string()
    .nonempty({ message: "You surely set a password when creating your account" })
    .min(5, { message: "Your password must be at least 5 characters long" }),
});

export default function Login(): JSX.Element {
  const form = useForm<z.infer<typeof LoginSchema>>({
    schema: zodResolver(LoginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });
  const commonTL = useTranslation("common");
  const loginTL = useTranslation("login");

  const onSubmit = form.onSubmit(async ({ email, password }) => {
    // Handle your credentials login here
    console.log({ email, password });
  });

  return (
    <Container size="xs">
      <Head>
        <title>
          {loginTL.t("title")} &bull; {commonTL.t("app-name")}
        </title>
      </Head>
      <Title align="center" sx={{ fontWeight: "bold" }}>
        {loginTL.t("title")}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {loginTL.t("is-unregistered")}
        <NextLink href="/register" passHref>
          <Anchor<"a"> size="sm">{loginTL.t("register-now")}</Anchor>
        </NextLink>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Button
          color="blue"
          fullWidth
          leftIcon={<BrandGoogle size={18} />}
          onClick={() => signIn("google", { redirect: false })}
        >
          {loginTL.t("with-google")}
        </Button>
        <Divider mt="sm" label={loginTL.t("or-with")} labelPosition="center" />
        <form onSubmit={onSubmit}>
          <TextInput disabled label={loginTL.t("fields.email")} {...form.getInputProps("email")} />
          <PasswordInput
            disabled
            mt="md"
            label={loginTL.t("fields.password")}
            {...form.getInputProps("password")}
          />
          <Checkbox disabled readOnly checked label={loginTL.t("fields.remember-me")} mt="md" />
          <Button disabled type="submit" leftIcon={<LoginIcon size={18} />} fullWidth mt="xl">
            {loginTL.t("title")}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", ["common", "login"])),
    },
  };
});
