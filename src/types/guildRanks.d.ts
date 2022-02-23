import { guild_membership, guilds } from "@prisma/client";

export type GuildRank = {
  id: number;
  guild_id: number;
  name: string;
  level: number;
  guilds?: guilds[];
  guild_membership?: guild_membership[];
};
