import { Text } from "@chakra-ui/react";
import { guild_membership, guilds } from "@prisma/client";
import { setupApiClient } from "@sword/services/axios";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import React, { FC, useEffect, useState } from "react";

import { SimpleCard } from "../simple-card";
import { GuildRankProps } from "./guild-rank.props";

type Guild = {
  id: number;
  guild_id: number;
  name: string;
  level: number;
  guilds?: guilds[];
  guild_membership?: guild_membership[];
};

export const GuildRanks: FC<GuildRankProps> = ({
  containerStyle,
  ranksStyle,
  titleStyle,
}): JSX.Element => {
  const [guildRanks, setGuildRanks] = useState<Guild[]>([] as Guild[]);
  const router = useRouter();
  const translate = useTranslations("guildRanks");

  useEffect(() => {
    (async () => {
      const api = setupApiClient();

      await api
        .get<{ guilds: Guild[] }>(`/guild_ranks/read?type=all`)
        .then(({ data }) => {
          setGuildRanks(data.guilds);
        })
        .catch(({ response }) => console.log(response.data));
    })();
  }, [router]);

  return (
    <SimpleCard
      title={translate("Guild Ranks")}
      titleStyle={titleStyle}
      containerStyle={containerStyle}
    >
      {guildRanks.length > 0 ? (
        guildRanks.map((guild, index) => (
          <Text {...ranksStyle} key={guild.name + index}>{`${index + 1}. ${guild.name} - ${
            guild.level
          }`}</Text>
        ))
      ) : (
        <Text textAlign="center" {...ranksStyle}>
          {translate("There are no guilds in the rank")}
        </Text>
      )}
    </SimpleCard>
  );
};
