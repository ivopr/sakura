import { Heading, VStack } from "@chakra-ui/react";
import { players } from "@prisma/client";
import { useTranslations } from "next-intl";

type AccountCharactersTabProps = {
  characters: players[];
};

export function AccountCharactersTab({ characters }: AccountCharactersTabProps): JSX.Element {
  const translate = useTranslations("account.view.tabs.charactersTab");

  return (
    <VStack spacing="2.5">
      {characters.length === 0 ? (
        <Heading>There&apos;s no character to show</Heading>
      ) : (
        <Heading>Should show characters here</Heading>
      )}
    </VStack>
  );
}
