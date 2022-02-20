import { Button, Heading, Icon, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { IoLogInOutline } from "react-icons/io5";
import * as yup from "yup";

import { Input } from "../components/input";
import { Layout } from "../components/layout";

type LoginData = {
  email: string;
  password: string;
};

const LoginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email must be valid"),
  password: yup.string().required("Password is required"),
});

const Login: NextPage = () => {
  const { formState, handleSubmit, register } = useForm<LoginData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(LoginSchema),
  });

  return (
    <Layout pageTitle="Login">
      <Heading textAlign="center">Login</Heading>

      <VStack
        marginX="auto"
        marginY="5"
        maxWidth={{
          base: "full",
          md: "35%",
          xl: "25%",
        }}
      >
        <Input error={formState.errors.email} label="Email" type="email" {...register("email")} />
        <Input
          error={formState.errors.password}
          label="Password"
          type="password"
          {...register("password")}
        />
        <Button leftIcon={<Icon as={IoLogInOutline} height={5} width={5} />}>Login</Button>
      </VStack>
    </Layout>
  );
};

export default Login;
