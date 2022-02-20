import { Button, Heading, Icon, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { NextPage } from "next";
import { setCookie } from "nookies";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCheckmarkOutline, IoLogInOutline } from "react-icons/io5";
import * as yup from "yup";

import { Input } from "../components/input";
import { Layout } from "../components/layout";
import { setupApiClient } from "../services/axios";
import { toastSettings } from "../utils/toast";

type LoginData = {
  name: string;
  password: string;
};

const LoginSchema = yup.object().shape({
  name: yup.string().required("Account Name is required"),
  password: yup.string().required("Password is required"),
});

const Login: NextPage = () => {
  const [loginError, setLoginError] = useState(false);
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
        setLoginError(false);
        toast({
          ...toastSettings,
          title: "Logged In",
          status: "success",
        });
      })
      .catch(({ response }) => {
        setLoginError(true);
        toast({
          ...toastSettings,
          title: `${response?.data.message}`,
          status: "error",
        });
      });
  };

  return (
    <Layout pageTitle="Login">
      <Heading textAlign="center">Login</Heading>

      <VStack
        as="form"
        marginX="auto"
        marginY="5"
        maxWidth={{
          base: "full",
          md: "35%",
          xl: "25%",
        }}
        onSubmit={handleSubmit(onSubmit)}
        spacing="5"
      >
        <SimpleGrid columns={1} rowGap="2.5">
          <Input
            error={formState.errors.name}
            isDisabled={formState.isSubmitSuccessful && !loginError}
            label="Account Name"
            type="text"
            {...register("name")}
          />
          <Input
            error={formState.errors.password}
            isDisabled={formState.isSubmitSuccessful && !loginError}
            label="Password"
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
          {formState.isSubmitSuccessful && !loginError ? "Logged In" : "Login"}
        </Button>
      </VStack>
    </Layout>
  );
};

export default Login;
