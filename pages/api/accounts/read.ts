import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../services/prisma";
import { Account } from "../../../types/account";
import { ParseBigInt } from "../../../utils/bigint-parser";

type QueryData = {
  type: "all" | "one";
  shouldBringRelations?: "true" | "false";
  name?: string;
  email?: string;
  id?: number;
};

type Data =
  | Account
  | Account[]
  | {
      message?: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "GET") {
    const data = req.query as unknown as QueryData;

    if (data.type === "all") {
      try {
        const session = await getSession({ req });

        if (!session) {
          return res.status(401).json({ message: "unauthenticated" });
        }

        if (session.user.groupId < 6) {
          return res.status(401).json({ message: "unauthorized" });
        }

        const retAccounts = await prisma.accounts.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            creation: true,
            premium_ends_at: true,
            sakura_accounts: data.shouldBringRelations === "true",
            type: true,
            players: data.shouldBringRelations === "true",
          },
        });

        return res.status(200).json(ParseBigInt(retAccounts));
      } catch {
        return res.status(400).json({ message: "not-possible" });
      }
    } else if (data.type === "one") {
      try {
        const account = await prisma.accounts.findFirst({
          where: {
            OR: [
              { id: { equals: data.id } },
              { name: { equals: data.name } },
              { email: { equals: data.email } },
            ],
          },
          select: {
            id: true,
            name: true,
            email: true,
            creation: true,
            premium_ends_at: true,
            type: true,
            sakura_accounts: data.shouldBringRelations === "true",
            players: data.shouldBringRelations === "true",
          },
        });

        if (!account) {
          return res.status(400).json({
            message: "account-not-found",
          });
        }

        return res.status(200).json(ParseBigInt(account));
      } catch (erro) {
        console.log(erro);
        return res.status(400).json({ message: "not-possible" });
      }
    }
    return res.status(400).json({
      message: "bad-request",
    });
  }
  return res.status(405).json({
    message: `You can't ${req.method} this route.`,
  });
}
