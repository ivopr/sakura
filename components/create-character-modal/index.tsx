import { Button, Group, Modal, Radio, RadioGroup, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNotifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Plus } from "tabler-icons-react";
import { z } from "zod";

import { useGetAccountByNameQuery } from "../../store/api/accounts";
import { usePostCreateCharacterMutation } from "../../store/api/characters";

const CreateCharacterSchema = z.object({
  name: z.string().nonempty({ message: "Your character must have a name" }),
  gender: z.string().nonempty({ message: "Your must select the gender of your character" }),
  vocation: z.string().nonempty({ message: "Your must select the vocation of your character" }),
});

export function CreateCharacterModal(): JSX.Element {
  const [opened, setOpened] = useState(false);
  const [createCharacter] = usePostCreateCharacterMutation();
  const form = useForm<z.infer<typeof CreateCharacterSchema>>({
    schema: zodResolver(CreateCharacterSchema),
    initialValues: {} as z.infer<typeof CreateCharacterSchema>,
  });
  const notifications = useNotifications();
  const accountTL = useTranslation("account");

  const { data: sessionData } = useSession();
  const { refetch } = useGetAccountByNameQuery(sessionData?.user?.name as string);

  const onSubmit = form.onSubmit(async ({ name, gender, vocation }) => {
    await createCharacter({ name, sex: Number(gender), vocation: Number(vocation) })
      .unwrap()
      .then((data) => {
        if (data.message === "created") {
          notifications.showNotification({
            message: `Character created`,
            color: "green",
          });

          refetch();
          setOpened(false);
          form.reset();
        }
      })
      .catch(() => {
        notifications.showNotification({
          message: "There was an error creating your character",
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
        title={accountTL.t("create-character.title")}
      >
        <form onSubmit={onSubmit}>
          <TextInput label={accountTL.t("create-character.name")} {...form.getInputProps("name")} />
          <RadioGroup
            label={accountTL.t("create-character.gender")}
            mt="sm"
            {...form.getInputProps("gender")}
          >
            <Radio label={accountTL.t("create-character.male")} value="0" />
            <Radio label={accountTL.t("create-character.female")} value="1" />
          </RadioGroup>
          <Select
            label={accountTL.t("create-character.vocation")}
            mt="sm"
            placeholder={accountTL.t("create-character.select-your-vocation")}
            data={[
              { value: "1", label: "Knight" },
              { value: "2", label: "Paladin" },
              { value: "3", label: "Druid" },
              { value: "4", label: "Sorcerer" },
            ]}
            {...form.getInputProps("vocation")}
          />
          <Button type="submit" leftIcon={<Plus size={18} />} fullWidth mt="xl">
            {accountTL.t("create-character.title")}
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button color="green" fullWidth my="sm" onClick={() => setOpened(true)}>
          {accountTL.t("create-character.title")}
        </Button>
      </Group>
    </>
  );
}
