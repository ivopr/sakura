"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { LoginSchema, LoginType } from "./login.schema";

export function LoginForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginType> = async ({ name, password }) => {
    signIn("credentials", { name, password, redirect: false }).then(
      (response) => {
        console.log(response);
      }
    );
  };

  return (
    <form
      className="w-full lg:w-1/3 mx-auto flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        disabled={isSubmitting}
        error={errors.name}
        label="Nome de Conta"
        {...register("name")}
      />
      <Input
        disabled={isSubmitting}
        error={errors.password}
        label="Senha"
        type="password"
        {...register("password")}
      />
      <Button disabled={isSubmitting} type="submit">
        Entrar
      </Button>
    </form>
  );
}
