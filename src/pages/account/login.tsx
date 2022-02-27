import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { AppShell } from "@mantis/components/app-shell";
import { PasswordInput } from "@mantis/components/input/password";
import { TextInput } from "@mantis/components/input/text";
import { withSSRGuest } from "@mantis/hocs/with-ssr-guest";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoLogIn } from "react-icons/io5";
import { z } from "zod";

type LoginData = {
  name: string;
  password: string;
};

const LoginSchema = z.object({
  name: z.string().nonempty({ message: "What is your account name?" }),
  password: z
    .string()
    .nonempty({ message: "You surely set a password when creating your account" })
    .min(5, { message: "Your password must be at least 5 characters long" }),
});

export default function AccountLogin(): JSX.Element {
  const notifications = useNotifications();
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async ({ name, password }) => {
    await signIn("credentials", {
      name: name,
      password: password,
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
  };

  return (
    <AppShell title="Login">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={(theme) => ({
          maxWidth: theme.breakpoints.xs / 1.5,
          marginLeft: "auto",
          marginRight: "auto",
        })}
      >
        <Title align="center" my="xs">
          Login
        </Title>
        <TextInput
          error={errors.name?.message}
          my="xs"
          label="Account Name"
          size="lg"
          {...register("name")}
        />
        <PasswordInput
          error={errors.password?.message}
          my="xs"
          size="lg"
          label="Password"
          {...register("password")}
        />
        <Button
          color="green"
          size="lg"
          loading={isSubmitting}
          leftIcon={<IoLogIn size={18} />}
          my="xs"
          type="submit"
          fullWidth
        >
          Login
        </Button>
      </Box>
    </AppShell>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
