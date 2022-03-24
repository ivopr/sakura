import { createHash } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../services/prisma";
import { AccountCreateData } from "../../../types/account";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "POST") {
    try {
      const data: AccountCreateData = req.body;

      const existingAccount = await prisma.accounts.findFirst({
        where: {
          OR: [{ email: { equals: data.account.email } }, { name: { equals: data.account.name } }],
        },
      });

      if (existingAccount) {
        return res.status(409).json({
          message: "account-name-email-not-unique",
        });
      }

      if (data.account.password.length < 5) {
        return res.status(400).json({
          message: "short-password",
        });
      }

      const hashedPassword = createHash("sha1").update(data.account.password).digest("hex");

      await prisma.accounts.create({
        data: {
          ...data.account,
          password: hashedPassword,
          creation: Number(Date.now().toString().slice(0, 10)),
          sakura_account: data.sakura_account
            ? {
                create: {
                  ...data.sakura_account,
                },
              }
            : undefined,
        },
      });

      return res.status(201).json({
        message: "created",
      });
    } catch {
      return res.status(400).json({
        message: "notCreated",
      });
    }
  } else {
    return res.status(405).json({
      message: `You can't ${req.method} this route.`,
    });
  }
}
