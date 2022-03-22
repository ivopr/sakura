import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNotifications } from "@mantine/notifications";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Login as LoginIcon } from "tabler-icons-react";
import { z } from "zod";

import { withSSRGuest } from "../hocs/with-ssr-guest";

export default function Login(): JSX.Element {
  const commonTL = useTranslation("common");
  const loginTL = useTranslation("login");

  const notifications = useNotifications();
  const router = useRouter();

  const LoginSchema = z
    .object({
      name: z.string().nonempty({ message: "What is your account name?" }),
      password: z
        .string()
        .nonempty({ message: "You surely set a password when creating your account" })
        .min(5, { message: "Your password must be at least 5 characters long" }),
    })
    .partial();
  const form = useForm<z.infer<typeof LoginSchema>>({
    schema: zodResolver(LoginSchema),
    initialValues: {},
  });

  const onSubmit = form.onSubmit(async ({ name, password }) => {
    // Handle your credentials login here
    await signIn("credentials", {
      name,
      password,
      redirect: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((result: any) => {
      if (result?.error === null) {
        notifications.showNotification({
          message: loginTL.t("logged-in"),
          color: "green",
        });

        router.push("/accounts");
      } else {
        notifications.showNotification({
          message: loginTL.t(result.error),
          color: "red",
        });
      }
    });
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
          <Anchor<"a"> ml={5} size="sm">
            {loginTL.t("register-now")}
          </Anchor>
        </NextLink>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <TextInput label={loginTL.t("fields.name")} {...form.getInputProps("name")} />
          <PasswordInput
            mt="md"
            label={loginTL.t("fields.password")}
            {...form.getInputProps("password")}
          />
          <Checkbox disabled readOnly checked label={loginTL.t("fields.remember-me")} mt="md" />
          <Button type="submit" leftIcon={<LoginIcon size={18} />} fullWidth mt="xl">
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
