import { Button, Heading, Icon, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCheckmarkOutline, IoPersonAddOutline } from "react-icons/io5";
import * as yup from "yup";

import { Input } from "../components/input";
import { Layout } from "../components/layout";
import { setupApiClient } from "../services/axios";
import { toastSettings } from "../utils/toast";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterSchema = yup.object().shape({
  name: yup.string().required("You must provide an Account Name"),
  email: yup.string().required("Email is required").email("Email must be valid"),
  password: yup
    .string()
    .min(5, "Your password must be at least 5 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(5, "Your password must be at least 5 characters long")
    .oneOf([yup.ref("password"), null], "The passwords don't match")
    .required("You must confirm your password"),
});

const Register: NextPage = () => {
  const [creationError, setCreationError] = useState(false);
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
        setCreationError(false);
        toast({
          ...toastSettings,
          title: "Account created",
          status: "success",
        });
      })
      .catch(({ response }: AxiosError) => {
        setCreationError(true);
        toast({
          ...toastSettings,
          title: response?.data.message,
          status: "error",
        });
      });
  };

  return (
    <Layout pageTitle="Register">
      <Heading textAlign="center">Register</Heading>

      <VStack
        as="form"
        marginX="auto"
        marginY="5"
        maxWidth={{
          base: "full",
          md: "75%",
        }}
        onSubmit={handleSubmit(onSubmit)}
        spacing="5"
      >
        <SimpleGrid
          columnGap="2.5"
          columns={{
            base: 1,
            md: 2,
          }}
          rowGap="5"
        >
          <Input
            error={formState.errors.name}
            isDisabled={formState.isSubmitSuccessful && !creationError}
            label="Account Name"
            type="text"
            {...register("name")}
          />
          <Input
            error={formState.errors.email}
            isDisabled={formState.isSubmitSuccessful && !creationError}
            label="Email"
            type="email"
            {...register("email")}
          />
          <Input
            error={formState.errors.password}
            isDisabled={formState.isSubmitSuccessful && !creationError}
            label="Password"
            type="password"
            {...register("password")}
          />
          <Input
            error={formState.errors.confirmPassword}
            isDisabled={formState.isSubmitSuccessful && !creationError}
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
          />
        </SimpleGrid>
        <Button
          colorScheme={formState.isSubmitSuccessful && !creationError ? "green" : undefined}
          disabled={formState.isSubmitSuccessful && !creationError}
          isLoading={formState.isSubmitting}
          leftIcon={
            formState.isSubmitSuccessful && !creationError ? (
              <Icon as={IoCheckmarkOutline} height={5} width={5} />
            ) : (
              <Icon as={IoPersonAddOutline} height={5} width={5} />
            )
          }
          type="submit"
          width="100%"
        >
          {formState.isSubmitSuccessful && !creationError ? "Registered" : "Register"}
        </Button>
      </VStack>
    </Layout>
  );
};

export default Register;
