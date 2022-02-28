import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { TextInput } from "@mantis/components/input/text";
import { staticInfo } from "@mantis/config";
import { withSSRAuth } from "@mantis/hocs/with-ssr-auth";
import { usePostCreateCharacterMutation } from "@mantis/store/apis/character";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoPersonAdd } from "react-icons/io5";
import { z } from "zod";

type CreateCharacterData = {
  name: string;
};

const CreateCharacterSchema = z.object({
  name: z.string().nonempty({ message: "Your character mus have a name" }),
});

export default function CreateCharacter(): JSX.Element {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CreateCharacterData>({
    resolver: zodResolver(CreateCharacterSchema),
  });
  const [createCharacter] = usePostCreateCharacterMutation();

  const notifications = useNotifications();
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateCharacterData> = async ({ name }) => {
    const response = await createCharacter({ name }).unwrap();

    if (response.message === "created") {
      notifications.showNotification({
        message: "Character created!",
        autoClose: 5000,
        color: "green",
      });

      router.push("/account");
    } else {
      notifications.showNotification({
        message: "There was an error while creating your character",
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
        <title>Create Character &bull; {staticInfo.serverName}</title>
      </Head>
      <Title align="center" my="xs">
        Create Charactr
      </Title>
      <TextInput
        error={errors.name?.message}
        my="xs"
        label="Character Name"
        size="lg"
        {...register("name")}
      />
      <Button
        color="green"
        size="lg"
        loading={isSubmitting}
        leftIcon={<IoPersonAdd size={18} />}
        my="xs"
        type="submit"
        fullWidth
      >
        Create Character
      </Button>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
