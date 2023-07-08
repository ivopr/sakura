"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { CreateAccountSchema, CreateAccountType } from "./createAccount.schema";

type Props = {
  createAccount: (props: AccountCreateData) => void;
};

export function RegisterForm({ createAccount }: Props) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CreateAccountType>({
    resolver: zodResolver(CreateAccountSchema),
  });

  const onSubmit: SubmitHandler<CreateAccountType> = async ({
    email,
    name,
    password,
    pronoun,
    realName,
  }) => {
    createAccount({
      account: {
        name,
        password,
        email,
      },
      sakura_account: {
        pronoun,
        real_name: realName,
      },
    });
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
        error={errors.email}
        label="Email"
        type="email"
        {...register("email")}
      />
      <Input
        disabled={isSubmitting}
        error={errors.password}
        label="Senha"
        type="password"
        {...register("password")}
      />
      <Input
        disabled={isSubmitting}
        error={errors.confirmPassword}
        label="Confirmar Senha"
        type="password"
        {...register("confirmPassword")}
      />
      <Button disabled={isSubmitting} type="submit">
        Criar Conta
      </Button>
    </form>
  );
}
