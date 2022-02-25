import { Box, Text } from "@chakra-ui/react";
import { useGetGuildRanksQuery } from "@sword/store/apis/guildRanks";
import { useTranslations } from "next-intl";
import React, { FC } from "react";

import { SimpleCard } from "../simple-card";

export const GuildRanks: FC = (): JSX.Element => {
  const translate = useTranslations("guildRanks");
  const { data } = useGetGuildRanksQuery("");

  return (
    <SimpleCard
      title={translate("Guild Ranks")}
      titleStyle={{
        textAlign: "center",
        fontSize: { base: 15, md: 30 },
      }}
      containerStyle={{
        width: { base: "fit-content", md: "initial" },
        justifyContent: "center",
      }}
    >
      {data && data.guildsRank?.length > 0 ? (
        data.guildsRank.map((guild, index) => (
          <Box
            key={guild.name + index}
            justifyContent="space-between"
            flexDirection="row"
            display="flex"
            paddingX={5}
          >
            <Text
              width={{ base: "fit-content", md: "initial" }}
              fontSize={{ base: 12, md: 20 }}
              paddingY="2"
            >{`${index + 1}.`}</Text>
            <Text
              width={{ base: "fit-content", md: "initial" }}
              fontSize={{ base: 12, md: 16 }}
              paddingY="2"
            >{`${guild.name}`}</Text>
            <Text
              width={{ base: "fit-content", md: "initial" }}
              fontSize={{ base: 12, md: 20 }}
              paddingY="2"
            >{`${guild.level}`}</Text>
          </Box>
        ))
      ) : (
        <Text
          width={{ base: "fit-content", md: "initial" }}
          fontSize={{ base: 12, md: 20 }}
          textAlign="center"
          paddingX="10"
          paddingY="2"
        >
          {translate("There are no guilds in the rank")}
        </Text>
      )}
    </SimpleCard>
  );
};
