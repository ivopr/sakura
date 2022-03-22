import { accounts, players } from "@prisma/client";

export type Account = accounts & {
  players: players[];
};
