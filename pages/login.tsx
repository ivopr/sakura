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
import { useNotifications } from "@mantine/notifications";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { BrandGoogle, Login as LoginIcon } from "tabler-icons-react";
import { z } from "zod";

import { withSSRGuest } from "../hocs/with-ssr-guest";

const LoginSchema = z.object({
  name: z.string().nonempty({ message: "What is your account name?" }),
  password: z
    .string()
    .nonempty({ message: "You surely set a password when creating your account" })
    .min(5, { message: "Your password must be at least 5 characters long" }),
});

export default function Login(): JSX.Element {
  const notifications = useNotifications();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    schema: zodResolver(LoginSchema),
    initialValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = form.onSubmit(async ({ name, password }) => {
    await signIn("credentials", {
      name,
      password,
      redirect: false,
      callbackUrl: "/",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((data: any) => {
      const { error } = data;

      if (error) {
        notifications.showNotification({
          message: error,
          autoClose: 5000,
          color: "red",
        });
      } else {
        notifications.showNotification({
          message: "Logged in",
          autoClose: 5000,
          color: "green",
        });

        router.push("/account");
      }
    });
  });

  return (
    <Container size="xs">
      <Head>
        <title>Login &bull; Abyss</title>
      </Head>
      <Title align="center" sx={{ fontWeight: "bold" }}>
        Login
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <NextLink href="/register" passHref>
          <Anchor<"a"> size="sm">Create account</Anchor>
        </NextLink>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Button
          color="blue"
          fullWidth
          leftIcon={<BrandGoogle size={18} />}
          onClick={() => signIn("google", { redirect: false })}
        >
          Google
        </Button>
        <Divider mt="sm" label="or with" labelPosition="center" />
        <form onSubmit={onSubmit}>
          <TextInput disabled label="Account Name" {...form.getInputProps("name")} />
          <PasswordInput disabled mt="md" label="Password" {...form.getInputProps("password")} />
          <Checkbox disabled readOnly checked label="Remember me" mt="md" />
          <Button disabled type="submit" leftIcon={<LoginIcon size={18} />} fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
