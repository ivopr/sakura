import { Button, Heading, Icon, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@sword/components/input";
import { Layout } from "@sword/components/layout";
import { setupApiClient } from "@sword/services/axios";
import { toastSettings } from "@sword/utils/toast";
import type { GetStaticProps, NextPage } from "next";
import { useTranslations } from "next-intl";
import { setCookie } from "nookies";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCheckmarkOutline, IoLogInOutline } from "react-icons/io5";
import * as yup from "yup";

type LoginData = {
  name: string;
  password: string;
};

const Login: NextPage = () => {
  const [loginError, setLoginError] = useState(false);

  const translate = useTranslations("login");

  const LoginSchema = yup.object().shape({
    name: yup.string().required(translate("accountNameRequired")),
    password: yup.string().required(translate("passwordRequired")),
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
        setLoginError(false);
        toast({
          ...toastSettings,
          title: translate("loggedIn"),
          status: "success",
        });
      })
      .catch(({ response }) => {
        setLoginError(true);
        toast({
          ...toastSettings,
          title: translate(`requestErrors.${response.data.message}`),
          status: "error",
        });
      });
  };

  return (
    <Layout pageTitle={translate("title")}>
      <Heading textAlign="center">{translate("title")}</Heading>

      <VStack
        as="form"
        marginX="auto"
        marginY="5"
        maxWidth={{
          base: "full",
          md: "35%",
        }}
        onSubmit={handleSubmit(onSubmit)}
        spacing="5"
      >
        <SimpleGrid columns={1} rowGap="2.5">
          <Input
            error={formState.errors.name}
            isDisabled={formState.isSubmitSuccessful && !loginError}
            label={translate("accountName")}
            type="text"
            {...register("name")}
          />
          <Input
            error={formState.errors.password}
            isDisabled={formState.isSubmitSuccessful && !loginError}
            label={translate("password")}
            type="password"
            {...register("password")}
          />
        </SimpleGrid>
        <Button
          colorScheme={formState.isSubmitSuccessful && !loginError ? "green" : undefined}
          disabled={formState.isSubmitSuccessful && !loginError}
          isLoading={formState.isSubmitting}
          leftIcon={
            formState.isSubmitSuccessful && !loginError ? (
              <Icon as={IoCheckmarkOutline} height={5} width={5} />
            ) : (
              <Icon as={IoLogInOutline} height={5} width={5} />
            )
          }
          type="submit"
          width="full"
        >
          {formState.isSubmitSuccessful && !loginError ? translate("loggedIn") : translate("title")}
        </Button>
      </VStack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@sword/locales/pages/${locale}.json`)).default,
    },
  };
};

export default Login;
