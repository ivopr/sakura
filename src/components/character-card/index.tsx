import { Box, Heading, Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { players } from "@prisma/client";
import NextLink from "next/link";
import { useTranslations } from "next-intl";

type CharacterCardProps = {
  character: Partial<players>;
};

export function CharacterCard({ character }: CharacterCardProps): JSX.Element {
  const translate = useTranslations("character.card");

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
            {translate("vocation", { vocation: character.vocation })} &bull;{" "}
            {translate("level", { level: character.level })}
          </Text>
        </Box>
      </LinkBox>
    </NextLink>
  );
}
