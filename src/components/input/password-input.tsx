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
import { useTranslations } from "next-intl";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import { FieldError } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

type PasswordFieldProps = InputProps & {
  error?: FieldError;
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ error, ...rest }, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const translate = useTranslations("login");
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
        <FormLabel htmlFor="password">{translate("password")}</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              aria-label={isOpen ? translate("maskPassword") : translate("revealPassword")}
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
