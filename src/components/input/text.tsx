import {
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import { forwardRef, ForwardRefRenderFunction } from "react";

type TextInputProps = MantineTextInputProps;

const InputBase: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { name, error, label, ...rest },
  ref
): JSX.Element => {
  return <MantineTextInput error={error} label={label} ref={ref} id={name} name={name} {...rest} />;
};

export const TextInput = forwardRef(InputBase);
