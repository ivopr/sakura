import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/services/prisma";
import { ParseBigInt } from "@/utils/bigint-parser";

type Data =
  | Account
  | Account[]
  | {
      message?: string;
    };

export async function readAccount(
  type: "all" | "one",
  id?: number,
  name?: string,
  email?: string,
  shouldBringRelations = false
): Promise<Data> {
  if (type === "all") {
    try {
      // @ts-ignore
      const session = await getServerSession(authOptions);

      if (!session || session.user.groupId < 6) {
        return { message: "unauthorized" };
      }

      const retAccounts = await prisma.accounts.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          creation: true,
          premium_ends_at: true,
          sakura_accounts: shouldBringRelations,
          type: true,
          players: shouldBringRelations,
        },
      });

      return ParseBigInt(retAccounts);
    } catch {
      return { message: "not-possible" };
    }
  } else if (type === "one") {
    try {
      const account = await prisma.accounts.findFirst({
        where: {
          OR: [
            { id: { equals: id } },
            { name: { equals: name } },
            { email: { equals: email } },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
          creation: true,
          premium_ends_at: true,
          type: true,
          sakura_accounts: shouldBringRelations,
          players: shouldBringRelations,
        },
      });

      if (!account) {
        return {
          message: "account-not-found",
        };
      }

      return ParseBigInt(account);
    } catch (erro) {
      console.log(erro);
      return { message: "not-possible" };
    }
  }
  return {
    message: "bad-request",
  };
}
