import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { setupApiClient } from "@sword/services/axios";
import { toastSettings } from "@sword/utils/toast";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Input } from "../input";

type DeleteAccountModalProps = {
  accountId: number;
  accountName: string;
};

type DeleteAccountData = {
  confirmation: string;
};

export function DeleteAccountModal({ accountName }: DeleteAccountModalProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const translate = useTranslations("account.view.delete");

  const DeleteAccountSchema = yup.object().shape({
    confirmation: yup
      .string()
      .oneOf([accountName, null], translate("wrongConfirmation"))
      .required(translate("mustConfirm")),
  });

  const { formState, handleSubmit, register, reset } = useForm<DeleteAccountData>({
    mode: "onChange",
    resolver: yupResolver(DeleteAccountSchema),
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<DeleteAccountData> = async ({ confirmation }) => {
    toast.closeAll();
    const api = setupApiClient();

    await api
      .delete("/account/delete", {
        data: {
          confirmation,
        },
      })
      .then(() => {
        reset();
        onClose();
        toast({
          ...toastSettings,
          title: translate("deleted"),
          status: "info",
        });
      })
      .catch(({ response }: AxiosError) => {
        console.log(response?.data);
        toast({
          ...toastSettings,
          title: `errors.${response?.data.message}`,
          status: "error",
        });
      });
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        {translate("title")}
      </Button>

      <Modal
        finalFocusRef={undefined}
        initialFocusRef={undefined}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        returnFocusOnClose={false}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{translate("title")}</ModalHeader>
          <ModalBody>
            <Text>{translate("content")}</Text>
            <Text color="red">{translate("irreversible")}</Text>
            <Divider marginY="2.5" />
            <Text>{translate("confirmationContent")}</Text>
            <Input error={formState.errors.confirmation} {...register("confirmation")} />
            <Divider marginY="2.5" />
          </ModalBody>
          <ModalFooter>
            <HStack spacing="2.5">
              <Button width="full" colorScheme="red" type="submit">
                {translate("title")}
              </Button>
              <Button width="full" onClick={onClose} variant="ghost">
                {translate("cancel")}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
