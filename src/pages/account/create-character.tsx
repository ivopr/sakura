import {
  Box,
  Button,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@sword/components/input";
import { Layout } from "@sword/components/layout";
import { withSSRAuth } from "@sword/hocs/with-ssr-auth";
import { usePostCreateCharacterMutation } from "@sword/store/apis/character";
import { toastSettings } from "@sword/utils/toast";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type CharacterData = {
  name: string;
};

const CreateCharacter: NextPage = () => {
  const [createCharacter] = usePostCreateCharacterMutation();

  const translate = useTranslations("account.create-character");

  const toast = useToast();
  const router = useRouter();

  const CharacterSchema = yup.object().shape({
    name: yup.string().required(translate("characterNameRequired")),
  });

  const { formState, handleSubmit, register } = useForm<CharacterData>({
    mode: "onChange",
    resolver: yupResolver(CharacterSchema),
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<CharacterData> = async ({ name }) => {
    const response = await createCharacter({ name }).unwrap();

    if (response.message === "created") {
      toast({
        ...toastSettings,
        title: translate("created"),
        status: "success",
      });
      router.push("/account");
    } else {
      toast({
        ...toastSettings,
        title: translate(`${response.message}`),
        status: "error",
      });
    }
  };

  return (
    <Layout pageTitle={translate("title")}>
      <Stack maxWidth="md" marginX="auto" spacing="8">
        <Stack spacing="6">
          <Stack textAlign="center" spacing={{ base: "2", md: "3" }}>
            <Heading size={useBreakpointValue({ base: "lg", md: "xl" })}>
              {translate("title")}
            </Heading>
          </Stack>
        </Stack>
        <Box
          borderRadius={{ base: "none", sm: "xl" }}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          backgroundColor={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          paddingX={{ base: "4", sm: "10" }}
          paddingY={{ base: "0", sm: "8" }}
        >
          <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing="6">
            <Stack spacing="5">
              <Input
                error={formState.errors.name}
                label={translate("characterName")}
                {...register("name")}
              />
            </Stack>
            <Button isLoading={formState.isSubmitting} type="submit">
              {translate("title")}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@sword/locales/${locale}.json`)).default,
    },
  };
});

export default CreateCharacter;
