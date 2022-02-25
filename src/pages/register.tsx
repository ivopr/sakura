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
import { usePostCreateAccountMutation } from "@sword/store/apis/account";
import { toastSettings } from "@sword/utils/toast";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: NextPage = () => {
  const [createAccount] = usePostCreateAccountMutation();
  const router = useRouter();

  const RegisterSchema = yup.object().shape({
    name: yup.string().required("You must set an Account Name"),
    email: yup.string().required("You must set an Email").email("The Email must be a valid one"),
    password: yup
      .string()
      .min(5, "Your password must be at least 5 characters long")
      .required("Your account should have a password"),
    confirmPassword: yup
      .string()
      .min(5, "Your password must be at least 5 characters long")
      .required("Your account should have a password")
      .oneOf([yup.ref("password"), null], "Passwords doesn't match"),
  });

  const { formState, handleSubmit, register } = useForm<RegisterData>({
    mode: "onChange",
    resolver: yupResolver(RegisterSchema),
    reValidateMode: "onChange",
  });
  const toast = useToast();

  const onSubmit: SubmitHandler<RegisterData> = async ({ email, password, name }) => {
    toast.closeAll();

    const response = await createAccount({ email, name, password }).unwrap();

    if (response.message === "created") {
      toast({
        ...toastSettings,
        title: "Account created",
        status: "success",
      });
      router.push("/login");
    } else {
      toast({
        ...toastSettings,
        title: response.message,
        status: "error",
      });
    }
  };

  return (
    <Layout pageTitle="Register">
      <Stack maxWidth="md" marginX="auto" spacing="8">
        <Stack spacing="6">
          <Stack textAlign="center" spacing={{ base: "2", md: "3" }}>
            <Heading size={useBreakpointValue({ base: "lg", md: "xl" })}>Create Account</Heading>
            <HStack justify="center" spacing="1">
              <Text color="muted">Already have an account?</Text>
              <Button colorScheme="blue" variant="link">
                Login
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
              <Input error={formState.errors.name} label="Account Name" {...register("name")} />
              <Input error={formState.errors.email} label="Email" {...register("email")} />
              <PasswordField
                label="Password"
                error={formState.errors.password}
                {...register("password")}
              />
              <PasswordField
                label="Confirm Password"
                error={formState.errors.confirmPassword}
                {...register("confirmPassword")}
              />
            </Stack>
            <Button isLoading={formState.isSubmitting} type="submit">
              Create Account
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});

export default Register;
