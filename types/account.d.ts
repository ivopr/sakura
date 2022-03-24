import { accounts, players, Prisma, sakura_accounts } from "@prisma/client";

export type Account = accounts & {
  sakura_account?: sakura_accounts;
  players?: players[];
};

export type AccountCreateData = {
  account: Prisma.accountsCreateInput;
  sakura_account?: Prisma.sakura_accountsCreateWithoutAccountInput;
};

export type AccountUpdateData = Prisma.sakura_accountsUpdateWithoutAccountInput;
