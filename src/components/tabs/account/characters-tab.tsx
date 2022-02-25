import { Button, Flex, Heading, Icon, VStack } from "@chakra-ui/react";
import { players } from "@prisma/client";
import { CharacterCard } from "@sword/components/character-card";
import NextLink from "next/link";
import { IoAddOutline } from "react-icons/io5";

type AccountCharactersTabProps = {
  characters: players[];
};

export function AccountCharactersTab({ characters }: AccountCharactersTabProps): JSX.Element {
  return characters.length === 0 ? (
    <Flex flexDirection="column">
      <Heading marginBottom="2.5" textAlign="center">
        No characters to show
      </Heading>
      <NextLink href="/account/create-character" passHref>
        <Button
          as="a"
          alignSelf="center"
          width="fit-content"
          marginBottom="2.5"
          leftIcon={<Icon as={IoAddOutline} />}
        >
          Create character
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
          Create character
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
