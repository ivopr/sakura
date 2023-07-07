import { createHash } from "crypto";

import { prisma } from "@/services/prisma";

export async function createAccount(data: AccountCreateData) {
  try {
    const existingAccount = await prisma.accounts.findFirst({
      where: {
        OR: [
          { email: { equals: data.account.email } },
          { name: { equals: data.account.name } },
        ],
      },
    });

    if (existingAccount) {
      return {
        message: "account-name-email-not-unique",
      };
    }

    if (data.account.password.length < 5) {
      return {
        message: "short-password",
      };
    }

    const hashedPassword = createHash("sha1")
      .update(data.account.password)
      .digest("hex");

    await prisma.accounts.create({
      data: {
        ...data.account,
        password: hashedPassword,
        creation: Number(Date.now().toString().slice(0, 10)),
        sakura_accounts: data.sakura_account
          ? {
              create: {
                ...data.sakura_account,
              },
            }
          : undefined,
      },
    });

    return {
      message: "created",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "notCreated",
    };
  }
}
