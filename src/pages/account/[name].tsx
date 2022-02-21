import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { players } from "@prisma/client";
import { AxiosError } from "axios";
import { DateTime } from "luxon";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IoIdCardOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import * as yup from "yup";

import { Input } from "../../components/input";
import { Layout } from "../../components/layout";
import { setupApiClient } from "../../services/axios";
import { toastSettings } from "../../utils/toast";

type SingleAccount = {
  id: number;
  name: string;
  email: string;
  type: number;
  premium_ends_at: number;
  creation: number;
  players?: players[];
} | null;

const Account: NextPage = () => {
  const [account, setAccount] = useState<SingleAccount>();
  const router = useRouter();
  const accountLabelSize = "lg";

  useEffect(() => {
    (async () => {
      const { name } = router.query;
      if (!name) return;

      const api = setupApiClient();

      await api
        .get<{ account: SingleAccount }>(
          `/account/read?type=one&name=${name}&shouldBringRelations=true`
        )
        .then(({ data }) => {
          setAccount(data.account);
        })
        .catch(({ response }) => console.log(response.data));
    })();
  }, [router]);

  if (!account) {
    return (
      <Layout pageTitle="Loading - Account">
        <Heading>Loading</Heading>
      </Layout>
    );
  }

  return (
    <Layout pageTitle={`${account.name} - Account`}>
      {/** BEGIN Avatar, Name and Email */}
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
        }}
        marginX="auto"
        gap="5"
        width="fit-content"
      >
        <Avatar
          backgroundColor="primary.500"
          marginX={{
            base: "auto",
            md: 0,
          }}
          size="2xl"
        />
        <VStack marginY="auto" spacing="1">
          <Heading textTransform="capitalize">{account.name}</Heading>
          <Text>{account.email}</Text>
        </VStack>
      </SimpleGrid>
      {/** END Avatar, Name and Email */}

      {/** BEGIN Account Info Tabs */}
      <Tabs marginY="5" variant="solid-rounded">
        <TabList gap="2.5" justifyContent="center" flexWrap="wrap">
          <Tab>
            <Icon as={IoIdCardOutline} marginRight="1" />
            Account
          </Tab>
          <Tab>
            <Icon as={IoPersonOutline} marginRight="1" />
            Characters
          </Tab>
          <Tab>
            <Icon as={IoPeopleOutline} marginRight="1" /> Friends
          </Tab>
          <Tab>
            <Icon as={IoSettingsOutline} marginRight="1" /> Settings
          </Tab>
        </TabList>
        <Divider marginY="2" />
        <TabPanels>
          <TabPanel>
            <VStack alignItems="flex-start" spacing="1.5">
              <HStack spacing="1.5">
                <Text fontSize={accountLabelSize} fontWeight="semibold" marginRight="1.5">
                  Group:
                </Text>
                <Text>{account.type}</Text>
              </HStack>
              <HStack spacing="1.5">
                <Text fontSize={accountLabelSize} fontWeight="semibold" marginRight="1.5">
                  Premium:
                </Text>
                <Text>
                  {account.premium_ends_at !== 0
                    ? `Ends in ${DateTime.fromSeconds(account.premium_ends_at).toLocaleString({
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}`
                    : "No"}
                </Text>
              </HStack>
              <HStack spacing="1.5">
                <Text fontSize={accountLabelSize} fontWeight="semibold" marginRight="1.5">
                  Total characters:
                </Text>
                <Text>
                  {account.players && account.players.length > 0 ? account.players.length : 0}
                </Text>
              </HStack>
              <HStack spacing="1.5">
                <Text fontSize={accountLabelSize} fontWeight="semibold" marginRight="1.5">
                  Created at:
                </Text>
                <Text>
                  {DateTime.fromSeconds(account.creation).toLocaleString({
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </HStack>
            </VStack>
          </TabPanel>
          <TabPanel>
            <p>Characters</p>
          </TabPanel>
          <TabPanel>
            <p>Friends</p>
          </TabPanel>
          <TabPanel>
            <Alert flexDir="column" alignItems="center" status="error" variant="left-accent">
              <Box
                justifyContent="space-between"
                marginY={{
                  base: "2.5",
                  md: "0",
                }}
                flexDirection={{
                  base: "column",
                  md: "row",
                }}
                display="flex"
              >
                <AlertIcon boxSize="40px" marginRight="2.5" />
                <Box marginBottom="2.5">
                  <AlertTitle
                    fontSize="lg"
                    textAlign={{
                      base: "center",
                      md: "left",
                    }}
                  >
                    Delete Account
                  </AlertTitle>
                  <AlertDescription maxWidth="xs">
                    Note that every single thing you achieved, your characters, in-game items,
                    EVERYTHING, will be lost FOREVER.
                  </AlertDescription>
                </Box>
              </Box>
              <DeleteAccountModal accountId={account.id} accountName={account.name} />
            </Alert>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/** END Account Info Tabs */}
    </Layout>
  );
};

type DeleteAccountData = {
  confirmation: string;
};

type DeleteAccountModalProps = {
  accountId: number;
  accountName: string;
};

function DeleteAccountModal({ accountId, accountName }: DeleteAccountModalProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const DeleteAccountSchema = yup.object().shape({
    confirmation: yup
      .string()
      .oneOf([accountName, null], "This isn't the name of the account you're trying to delete")
      .required("You must confirm this action"),
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
          idToDelete: accountId,
          confirmation,
        },
      })
      .then(() => {
        reset();
        onClose();
        toast({
          ...toastSettings,
          title: "Account deleted",
          status: "info",
        });
      })
      .catch(({ response }: AxiosError) => {
        toast({
          ...toastSettings,
          title: `${response?.data.message}`,
          status: "error",
        });
      });
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Account
      </Button>

      <Modal
        isOpen={isOpen}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={false}
        isCentered
        initialFocusRef={undefined}
        finalFocusRef={undefined}
        returnFocusOnClose={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>You&apos;re trying to delete your account</ModalHeader>
          <ModalBody>
            <Text>
              If you&apos;re just changing accounts, make sure you&apos;ve transfered everything you
              need.
            </Text>
            <Text color="red">This action is irreversible.</Text>
            <Divider marginY="2.5" />
            <Text>
              To delete your account, we need that you yourself confirm what is the account name
            </Text>
            <Input error={formState.errors.confirmation} {...register("confirmation")} />
            <Divider marginY="2.5" />
          </ModalBody>
          <ModalFooter>
            <HStack spacing="2.5">
              <Button colorScheme="red" type="submit" width="full">
                Delete
              </Button>
              <Button variant="ghost" onClick={onClose} width="full">
                Don&apos;t delete
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Account;
