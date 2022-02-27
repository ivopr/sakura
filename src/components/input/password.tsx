import {
  PasswordInput as MantinePasswordInput,
  PasswordInputProps as MantinePasswordInputProps,
} from "@mantine/core";
import { forwardRef, ForwardRefRenderFunction } from "react";

type PasswordInputProps = MantinePasswordInputProps;

const InputBase: ForwardRefRenderFunction<HTMLInputElement, PasswordInputProps> = (
  { name, error, label, ...rest },
  ref
): JSX.Element => {
  return (
    <MantinePasswordInput error={error} label={label} ref={ref} id={name} name={name} {...rest} />
  );
};

export const PasswordInput = forwardRef(InputBase);
