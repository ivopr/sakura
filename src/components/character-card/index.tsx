import { Box, Heading, Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { players } from "@prisma/client";
import NextLink from "next/link";

type CharacterCardProps = {
  character: Partial<players>;
};

export function CharacterCard({ character }: CharacterCardProps): JSX.Element {
  return (
    <NextLink href={`/character/${character.name}`} passHref>
      <LinkBox
        as="article"
        display="flex"
        width="full"
        padding="2.5"
        background="gray.900"
        cursor="pointer"
        rounded="md"
      >
        <Image alt="player" src="/outfits/128/1_1_1_3.png" />
        <Box marginLeft="2.5">
          <Heading size="lg">
            <LinkOverlay>{character.name}</LinkOverlay>
          </Heading>
          <Text>
            Vocation: {character.vocation} &bull; Level: {character.level}
          </Text>
        </Box>
      </LinkBox>
    </NextLink>
  );
}
