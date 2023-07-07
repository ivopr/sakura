import { getServerSession } from "next-auth";

import { prisma } from "@/services/prisma";

import { authOptions } from "../api/auth/[...nextauth]/route";

type Data = {
  message: string;
};

export async function updateAccount(data: AccountUpdateData): Promise<Data> {
  try {
    // @ts-ignore
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return { message: "unauthenticated" };
    }

    if (!data) {
      return { message: "no-update-data" };
    }

    const existingAccount = await prisma.accounts.findFirst({
      where: {
        id: Number(session.user.id),
      },
    });

    if (!existingAccount) {
      return {
        message: "account-doesnt-exist",
      };
    }

    await prisma.sakura_accounts.update({
      where: {
        account_id: existingAccount.id,
      },
      data: {
        ...data,
      },
    });

    return {
      message: "updated",
    };
  } catch {
    return {
      message: "not-updated",
    };
  }
}
