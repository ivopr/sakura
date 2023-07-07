import { accounts, players, Prisma, sakura_accounts } from "@prisma/client";

declare global {
  type Account = accounts & {
    sakura_accounts?: sakura_accounts;
    players?: players[];
  };

  type AccountCreateData = {
    account: Prisma.accountsCreateInput;
    sakura_account?: Prisma.sakura_accountsCreateWithoutAccountInput;
  };

  type AccountUpdateData = Prisma.sakura_accountsUpdateWithoutAccountInput;
}
