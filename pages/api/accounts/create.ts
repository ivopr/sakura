import { accounts, Prisma } from "@prisma/client";
import { createHash } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../services/prisma";

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
      const data: Prisma.accountsCreateInput = req.body;

      const existingAccount = await prisma.accounts.findFirst({
        where: {
          OR: [{ email: { equals: data.email } }, { name: { equals: data.name } }],
        },
      });

      if (existingAccount) {
        return res.status(409).json({
          message: "accountNameEmailNotUnique",
        });
      }

      if (data.password.length < 5) {
        return res.status(400).json({
          message: "shortPassword",
        });
      }

      const hashedPassword = createHash("sha1").update(data.password).digest("hex");

      await prisma.accounts.create({
        data: {
          ...data,
          password: hashedPassword,
          creation: Number(Date.now().toString().slice(0, 10)),
        },
        select: {
          id: true,
          name: true,
          email: true,
          creation: true,
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
