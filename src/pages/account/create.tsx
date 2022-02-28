import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { staticInfo } from "@mantis/config";
import { withSSRGuest } from "@mantis/hocs/with-ssr-guest";
import { usePostCreateAccountMutation } from "@mantis/store/apis/account";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoPersonAdd } from "react-icons/io5";
import { z } from "zod";

type CreateAccountData = {
  name: string;
  email: string;
  password: string;
};

const CreateAccountSchema = z.object({
  name: z.string().nonempty({ message: "What is your account name?" }),
  email: z
    .string()
    .nonempty({ message: "I'm sure you got an email" })
    .email({ message: "Sure, but this one isn't valid" }),
  password: z
    .string()
    .nonempty({
      message:
        "Your account need to have at least a basic level of security, so write an strong password here",
    })
    .min(5, { message: "Your password must be at least 5 characters long" }),
});

export default function AccountCreate(): JSX.Element {
  const [createAccount] = usePostCreateAccountMutation();
  const notifications = useNotifications();
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CreateAccountData>({
    resolver: zodResolver(CreateAccountSchema),
  });

  const onSubmit: SubmitHandler<CreateAccountData> = async ({ name, email, password }) => {
    try {
      const response = await createAccount({ email, name, password }).unwrap();

      if (response.message === "created") {
        notifications.showNotification({
          message: "Account created",
          autoClose: 5000,
          color: "green",
        });
        router.push("/account");
      } else {
        notifications.showNotification({
          message: response.message,
          autoClose: 5000,
          color: "red",
        });
      }
    } catch {
      notifications.showNotification({
        message: "There was an error creating your account",
        autoClose: 5000,
        color: "red",
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={(theme) => ({
        maxWidth: theme.breakpoints.xs / 1.5,
        marginLeft: "auto",
        marginRight: "auto",
      })}
    >
      <Head>
        <title>Create Account &bull; {staticInfo.serverName}</title>
      </Head>
      <Title align="center" my="xs">
        Create Account
      </Title>
      <TextInput
        error={errors.name?.message}
        my="xs"
        size="lg"
        label="Account Name"
        {...register("name")}
      />
      <TextInput
        error={errors.email?.message}
        my="xs"
        size="lg"
        label="Email"
        {...register("email")}
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
        fullWidth
        loading={isSubmitting}
        leftIcon={<IoPersonAdd size={18} />}
        type="submit"
      >
        Create Account
      </Button>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
