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
import { setupApiClient } from "@sword/services/axios";
import { toastSettings } from "@sword/utils/toast";
import { GetStaticProps, NextPage } from "next";
import { useTranslations } from "next-intl";
import { setCookie } from "nookies";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type LoginData = {
  name: string;
  password: string;
};

const Login: NextPage = () => {
  const translate = useTranslations("login");

  const LoginSchema = yup.object().shape({
    name: yup.string().required(translate("accountNameRequired")),
    password: yup
      .string()
      .min(5, translate("requestErrors.passwordLength"))
      .required(translate("passwordRequired")),
  });

  const { formState, handleSubmit, register } = useForm<LoginData>({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
    reValidateMode: "onChange",
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<LoginData> = async ({ name, password }) => {
    toast.closeAll();
    const api = setupApiClient();

    await api
      .post("/authentication/login", {
        name: name,
        password: password,
      })
      .then(({ data }) => {
        setCookie(undefined, "SERVERNAME_SWORD_AUTH_TOKEN", data.session.token);
        setCookie(undefined, "SERVERNAME_SWORD_AUTH_REFRESH_TOKEN", data.session.refreshToken);
        toast({
          ...toastSettings,
          title: translate("loggedIn"),
          status: "success",
        });
      })
      .catch(({ response }) => {
        toast({
          ...toastSettings,
          title: translate(`requestErrors.${response.data.message}`),
          status: "error",
        });
      });
  };

  return (
    <Layout pageTitle={translate("title")}>
      <Stack maxWidth="md" marginX="auto" spacing="8">
        <Stack spacing="6">
          <Stack textAlign="center" spacing={{ base: "2", md: "3" }}>
            <Heading size={useBreakpointValue({ base: "lg", md: "xl" })}>
              {translate("title")}
            </Heading>
            <HStack justify="center" spacing="1">
              <Text color="muted">{translate("needRegister")}</Text>
              <Button colorScheme="blue" variant="link">
                {translate("register")}
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
              <PasswordField error={formState.errors.password} {...register("password")} />
            </Stack>
            <Button isLoading={formState.isSubmitting} type="submit">
              Sign in
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@sword/locales/${locale}.json`)).default,
    },
  };
};

export default Login;
