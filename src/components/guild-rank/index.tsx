import { Box, Text } from "@chakra-ui/react";
import { guild_membership, guilds } from "@prisma/client";
import { setupApiClient } from "@sword/services/axios";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import React, { FC, useEffect, useState } from "react";

import { SimpleCard } from "../simple-card";

type Guild = {
  id: number;
  guild_id: number;
  name: string;
  level: number;
  guilds?: guilds[];
  guild_membership?: guild_membership[];
};

export const GuildRanks: FC = (): JSX.Element => {
  const [guildRanks, setGuildRanks] = useState<Guild[]>([] as Guild[]);
  const router = useRouter();
  const translate = useTranslations("guildRanks");

  useEffect(() => {
    (async () => {
      const api = setupApiClient();

      await api
        .get<{ guildsRank: Guild[] }>(`/guildRanks/read?type=all`)
        .then(({ data }) => {
          console.log(data.guildsRank);
          setGuildRanks(data.guildsRank);
        })
        .catch(({ response }) => console.log(response));
    })();
  }, [router]);

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
      {guildRanks.length > 0 ? (
        guildRanks.map((guild, index) => (
          <Box
            key={guild.name + index}
            justifyContent="space-evenly"
            flexDirection="row"
            display="flex"
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
