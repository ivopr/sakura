import { Button, Group, Modal, Select, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNotifications } from "@mantine/notifications";
import { sakura_accounts } from "@prisma/client";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Pencil, UserPlus } from "tabler-icons-react";
import { z } from "zod";

import { usePutUpdateAccountMutation } from "../../store/api/accounts";

type UpdateAccountModalProps = {
  sakuraAccount?: sakura_accounts;
  refetch: () => void;
};

export function UpdateAccountModal({
  sakuraAccount,
  refetch,
}: UpdateAccountModalProps): JSX.Element {
  const [opened, setOpened] = useState(false);
  const [updateAccount] = usePutUpdateAccountMutation();
  const accountTL = useTranslation("account");
  const notifications = useNotifications();

  const UpdateAccountSchema = z.object({
    realname: z.string().optional().or(z.literal("")),
    pronoun: z.enum(["HE", "SHE"]),
  });
  const form = useForm<z.infer<typeof UpdateAccountSchema>>({
    schema: zodResolver(UpdateAccountSchema),
    initialValues: {
      realname: sakuraAccount?.real_name ?? "",
      pronoun: sakuraAccount?.pronoun ?? "HE",
    } as z.infer<typeof UpdateAccountSchema>,
  });

  const onSubmit = form.onSubmit(async ({ pronoun, realname }) => {
    await updateAccount({ pronoun, real_name: realname })
      .unwrap()
      .then((data) => {
        if (data.message === "updated") {
          notifications.showNotification({
            message: `Player created`,
            color: "green",
          });

          refetch();
          setOpened(false);
        }
      })
      .catch(() => {
        notifications.showNotification({
          message: "There was an error creating your player",
          color: "red",
        });
      });
  });

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title={accountTL.t("update.title")}
      >
        <Text color="dimmed" mb="md">
          {accountTL.t("update.helper")}
        </Text>
        <form onSubmit={onSubmit}>
          <TextInput
            label={accountTL.t("update.fields.realname")}
            {...form.getInputProps("realname")}
          />
          <Select
            label={accountTL.t("update.fields.pronoun")}
            mt="sm"
            data={[
              { value: "HE", label: accountTL.t("update.pronouns.he") },
              { value: "SHE", label: accountTL.t("update.pronouns.she") },
            ]}
            {...form.getInputProps("pronoun")}
          />
          <Button type="submit" leftIcon={<UserPlus size={18} />} fullWidth mt="xl">
            {accountTL.t("update.title")}
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button leftIcon={<Pencil size={18} />} fullWidth my="sm" onClick={() => setOpened(true)}>
          {accountTL.t("update.title")}
        </Button>
      </Group>
    </>
  );
}
