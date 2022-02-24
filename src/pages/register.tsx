import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@sword/components/input";
import { PasswordField } from "@sword/components/input/password-input";
import { Layout } from "@sword/components/layout";
import { withSSRGuest } from "@sword/hocs/with-ssr-guest";
import { setupApiClient } from "@sword/services/axios";
import { toastSettings } from "@sword/utils/toast";
import { AxiosError } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: NextPage = () => {
  const translate = useTranslations("register");
  const router = useRouter();

  const RegisterSchema = yup.object().shape({
    name: yup.string().required(translate("accountNameRequired")),
    email: yup.string().required(translate("emailRequired")).email("emailInvalid"),
    password: yup
      .string()
      .min(5, translate("shortPassword"))
      .required(translate("passwordRequired")),
    confirmPassword: yup
      .string()
      .min(5, translate("shortPassword"))
      .oneOf([yup.ref("password"), null], translate("passwordsNotMatch"))
      .required(translate("confirmPasswordRequired")),
  });

  const { formState, handleSubmit, register } = useForm<RegisterData>({
    mode: "onChange",
    resolver: yupResolver(RegisterSchema),
    reValidateMode: "onChange",
  });
  const toast = useToast();

  const onSubmit: SubmitHandler<RegisterData> = async ({ email, password, name }) => {
    toast.closeAll();
    const api = setupApiClient();

    await api
      .post("/account/create", {
        name,
        email,
        password,
      })
      .then(() => {
        toast({
          ...toastSettings,
          title: translate("created"),
          status: "success",
        });
        router.push("/login");
      })
      .catch(({ response }: AxiosError) => {
        toast({
          ...toastSettings,
          title: translate(response?.data.message),
          status: "error",
        });
      });
  };

  return (
    <Layout pageTitle="Register">
      <Stack maxWidth="md" marginX="auto" spacing="8">
        <Stack spacing="6">
          <Stack textAlign="center" spacing={{ base: "2", md: "3" }}>
            <Heading size={useBreakpointValue({ base: "lg", md: "xl" })}>
              {translate("title")}
            </Heading>
            <HStack justify="center" spacing="1">
              <Text color="muted">{translate("alreadyRegistered")}</Text>
              <Button colorScheme="blue" variant="link">
                {translate("login")}
              </Button>
            </HStack>
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
                label={translate("accountName")}
                {...register("name")}
              />
              <Input
                error={formState.errors.email}
                label={translate("email")}
                {...register("email")}
              />
              <PasswordField
                label={translate("password")}
                error={formState.errors.password}
                {...register("password")}
              />
              <PasswordField
                label={translate("confirmPassword")}
                error={formState.errors.confirmPassword}
                {...register("confirmPassword")}
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

export const getServerSideProps: GetServerSideProps = withSSRGuest(async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@sword/locales/${locale}.json`)).default,
    },
  };
});

export default Register;
