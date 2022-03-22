import { accounts, players, Prisma, sakura_accounts } from "@prisma/client";

export type Account = accounts & {
  sakura_account?: sakura_accounts;
  players?: players[];
};

export type AccountCreateData = Prisma.accountsCreateInput & {
  pronoun?: string;
  realname?: string;
};
