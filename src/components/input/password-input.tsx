import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import { FieldError } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

type PasswordFieldProps = InputProps & {
  error?: FieldError;
  label: string;
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ error, label, ...rest }, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);

    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = useCallback((): void => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, [onToggle]);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(
          inputRef.current.value.length,
          inputRef.current.value.length
        );
      }
    }, [isOpen]);

    return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor="password">{label}</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              aria-label={isOpen ? "Mask Password" : "Reveal Password"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
              variant="link"
            />
          </InputRightElement>
          <Input ref={mergeRef} type={isOpen ? "text" : "password"} {...rest} />
        </InputGroup>

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

PasswordField.displayName = "PasswordField";
