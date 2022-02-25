import { Button, Flex, Heading, Icon, VStack } from "@chakra-ui/react";
import { players } from "@prisma/client";
import { CharacterCard } from "@sword/components/character-card";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { IoAddOutline } from "react-icons/io5";

type AccountCharactersTabProps = {
  characters: players[];
};

export function AccountCharactersTab({ characters }: AccountCharactersTabProps): JSX.Element {
  const translate = useTranslations("account.view.tabs.charactersTab");

  return characters.length === 0 ? (
    <Flex flexDirection="column">
      <Heading marginBottom="2.5" textAlign="center">
        {translate("no-character")}
      </Heading>
      <NextLink href="/account/create-character" passHref>
        <Button
          as="a"
          alignSelf="center"
          width="fit-content"
          marginBottom="2.5"
          leftIcon={<Icon as={IoAddOutline} />}
        >
          {translate("create")}
        </Button>
      </NextLink>
    </Flex>
  ) : (
    <Flex flexDirection="column">
      <NextLink href="/account/create-character" passHref>
        <Button
          as="a"
          alignSelf="flex-end"
          width="fit-content"
          marginBottom="2.5"
          leftIcon={<Icon as={IoAddOutline} />}
        >
          {translate("create")}
        </Button>
      </NextLink>
      <VStack width="full" spacing="2.5">
        {characters.map((character) => (
          <CharacterCard key={character.name + character.id} character={character} />
        ))}
      </VStack>
    </Flex>
  );
}
