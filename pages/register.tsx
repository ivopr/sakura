import {
  Anchor,
  Button,
  Container,
  Divider,
  Paper,
  PasswordInput,
  Select,
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
import { UserPlus } from "tabler-icons-react";
import { z } from "zod";

import { withSSRGuest } from "../hocs/with-ssr-guest";
import { usePostCreateAccountMutation } from "../store/api/accounts";

export default function Register(): JSX.Element {
  const commonTL = useTranslation("common");
  const registerTL = useTranslation("register");

  const RegisterSchema = z
    .object({
      name: z
        .string({ required_error: registerTL.t("form-error.name-empty") })
        .nonempty({ message: registerTL.t("form-error.name-empty") }),
      email: z
        .string({ required_error: registerTL.t("form-error.email-empty") })
        .nonempty({ message: registerTL.t("form-error.email-empty") })
        .email({ message: registerTL.t("form-error.email-invalid") }),
      password: z
        .string({ required_error: registerTL.t("form-error.password-empty") })
        .nonempty({ message: registerTL.t("form-error.password-empty") })
        .min(5, { message: registerTL.t("form-error.password-min") }),
      passwordConfirmation: z
        .string({ required_error: registerTL.t("form-error.password-empty") })
        .nonempty({ message: registerTL.t("form-error.password-empty") })
        .min(5, { message: registerTL.t("form-error.password-min") }),
      realname: z
        .string({ required_error: registerTL.t("form-error.realname-empty") })
        .nonempty({ message: registerTL.t("form-error.realname-empty") }),
      pronoun: z
        .string({ required_error: registerTL.t("form-error.pronoun-empty") })
        .nonempty({ message: registerTL.t("form-error.pronoun-empty") }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: registerTL.t("form-error.password-do-not-match"),
      path: ["passwordConfirmation"],
    });
  const form = useForm<z.infer<typeof RegisterSchema>>({
    schema: zodResolver(RegisterSchema),
    initialValues: {
      pronoun: "HE",
    } as z.infer<typeof RegisterSchema>,
  });

  const [createAccount] = usePostCreateAccountMutation();
  const notifications = useNotifications();
  const router = useRouter();

  const onSubmit = form.onSubmit(async ({ email, name, password, pronoun, realname }) => {
    await createAccount({ email, name, password, pronoun, realname })
      .unwrap()
      .then(async () => {
        notifications.showNotification({
          message: registerTL.t("account-created"),
          color: "green",
        });

        await signIn("credentials", { email, password, redirect: false }).then(() =>
          router.push("/accounts")
        );
      })
      .catch(() => {});
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
          <Anchor<"a"> ml={5} size="sm">
            {registerTL.t("login")}
          </Anchor>
        </NextLink>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <Divider label={registerTL.t("game-account")} />
          <TextInput label={registerTL.t("fields.name")} {...form.getInputProps("name")} />
          <TextInput
            label={registerTL.t("fields.email")}
            mt="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            mt="md"
            label={registerTL.t("fields.password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            mt="md"
            label={registerTL.t("fields.password-confirmation")}
            {...form.getInputProps("passwordConfirmation")}
          />
          <Divider label={registerTL.t("community-account")} mt="md" />
          <TextInput label={registerTL.t("fields.realname")} {...form.getInputProps("realname")} />
          <Select
            label={registerTL.t("fields.pronoun")}
            mt="sm"
            data={[
              { value: "HE", label: registerTL.t("pronouns.he") },
              { value: "SHE", label: registerTL.t("pronouns.she") },
            ]}
            {...form.getInputProps("pronoun")}
          />
          <Button type="submit" leftIcon={<UserPlus size={18} />} fullWidth mt="xl">
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
