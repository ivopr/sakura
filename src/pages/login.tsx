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
import { toastSettings } from "@sword/utils/toast";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type LoginData = {
  name: string;
  password: string;
};

const Login: NextPage = () => {
  const translate = useTranslations("login");
  const toast = useToast();
  const router = useRouter();

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

  const onSubmit: SubmitHandler<LoginData> = async ({ name, password }) => {
    await signIn("credentials", {
      name: name,
      password: password,
      redirect: false,
      callbackUrl: "/",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((data: any) => {
      const { error } = data;

      if (error) {
        toast({
          ...toastSettings,
          title: translate(`requestErrors.${error}`),
          status: "error",
        });
      } else {
        toast({
          ...toastSettings,
          title: "Login successful",
          status: "success",
        });

        router.push("/account");
      }
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

export const getServerSideProps: GetServerSideProps = withSSRGuest(async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@sword/locales/${locale}.json`)).default,
    },
  };
});

export default Login;
