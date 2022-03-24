import { Button, Group, Modal, Radio, RadioGroup, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNotifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Plus } from "tabler-icons-react";
import { z } from "zod";

import { useGetAccountByNameQuery } from "../../store/api/accounts";
import { usePostCreatePlayerMutation } from "../../store/api/players";

export function UpdateAccountModal(): JSX.Element {
  const [opened, setOpened] = useState(false);
  const [createPlayer] = usePostCreatePlayerMutation();
  const accountTL = useTranslation("account");
  const notifications = useNotifications();

  const CreatePlayerSchema = z.object({
    name: z
      .string({ required_error: accountTL.t("create-player.form-error.name-empty") })
      .nonempty({ message: accountTL.t("create-player.form-error.name-empty") }),
    gender: z
      .string({ required_error: accountTL.t("create-player.form-error.gender-empty") })
      .nonempty({ message: accountTL.t("create-player.form-error.gender-empty") }),
    vocation: z
      .string({ required_error: accountTL.t("create-player.form-error.vocation-empty") })
      .nonempty({ message: accountTL.t("create-player.form-error.vocation-empty") }),
  });
  const form = useForm<z.infer<typeof CreatePlayerSchema>>({
    schema: zodResolver(CreatePlayerSchema),
    initialValues: {} as z.infer<typeof CreatePlayerSchema>,
  });

  const { data: sessionData } = useSession();
  const { refetch } = useGetAccountByNameQuery(sessionData?.user?.name as string);

  const onSubmit = form.onSubmit(async ({ name, gender, vocation }) => {
    await createPlayer({ name, sex: Number(gender), vocation: Number(vocation) })
      .unwrap()
      .then((data) => {
        if (data.message === "created") {
          notifications.showNotification({
            message: `Player created`,
            color: "green",
          });

          refetch();
          setOpened(false);
          form.reset();
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
        title={accountTL.t("create-player.title")}
      >
        <form onSubmit={onSubmit}>
          <TextInput label={accountTL.t("create-player.name")} {...form.getInputProps("name")} />
          <RadioGroup
            label={accountTL.t("create-player.gender")}
            mt="sm"
            {...form.getInputProps("gender")}
          >
            <Radio label={accountTL.t("create-player.male")} value="0" />
            <Radio label={accountTL.t("create-player.female")} value="1" />
          </RadioGroup>
          <Select
            label={accountTL.t("create-player.vocation")}
            mt="sm"
            placeholder={accountTL.t("create-player.select-your-vocation")}
            data={[
              { value: "1", label: "Knight" },
              { value: "2", label: "Paladin" },
              { value: "3", label: "Druid" },
              { value: "4", label: "Sorcerer" },
            ]}
            {...form.getInputProps("vocation")}
          />
          <Button type="submit" leftIcon={<Plus size={18} />} fullWidth mt="xl">
            {accountTL.t("create-player.title")}
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button color="green" fullWidth my="sm" onClick={() => setOpened(true)}>
          {accountTL.t("create-player.title")}
        </Button>
      </Group>
    </>
  );
}
