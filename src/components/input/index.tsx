import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

export interface FormInputProps extends InputProps {
  label?: string;
  name: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, FormInputProps> = (
  { name, error = null, label, ...rest },
  ref
): JSX.Element => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput ref={ref} id={name} name={name} paddingX="2.5" {...rest} />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
