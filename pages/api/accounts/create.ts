import { accounts, Prisma } from "@prisma/client";
import { createHash } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../services/prisma";
import { AccountCreateData } from "../../../types/account";

type Data = {
  account?: Partial<accounts>;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "POST") {
    try {
      const data: AccountCreateData = req.body;
      const sakuraAccountData: Prisma.sakura_accountsCreateWithoutAccountInput = {
        real_name: data.realname ?? "",
        pronoun: data.pronoun as "HE" | "SHE",
      };

      delete data.realname;
      delete data.pronoun;

      const existingAccount = await prisma.accounts.findFirst({
        where: {
          OR: [{ email: { equals: data.email } }, { name: { equals: data.name } }],
        },
      });

      if (existingAccount) {
        return res.status(409).json({
          message: "account-name-email-not-unique",
        });
      }

      if (data.password.length < 5) {
        return res.status(400).json({
          message: "short-password",
        });
      }

      const hashedPassword = createHash("sha1").update(data.password).digest("hex");

      await prisma.accounts.create({
        data: {
          ...data,
          password: hashedPassword,
          creation: Number(Date.now().toString().slice(0, 10)),
          sakura_account: {
            create: {
              ...sakuraAccountData,
            },
          },
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
