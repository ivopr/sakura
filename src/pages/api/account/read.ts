// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { accounts } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../services/prisma";

type QueryData = {
  type: "all" | "one" | "filtered";
  shouldBringRelations?: "true" | "false";
  name?: string;
  email?: string;
  id?: number;
};

type Data = {
  account?: Partial<accounts>;
  accounts?: Partial<accounts>[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "GET") {
    const data = req.query as unknown as QueryData;

    if (data.type === "all") {
      const accounts = await prisma.accounts.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          creation: true,
          premium_ends_at: true,
          type: true,
          players: data.shouldBringRelations === "true",
        },
      });

      return res.status(200).json({ accounts });
    } else if (data.type === "one") {
      const player =
        data.shouldBringRelations === "true"
          ? {
              select: {
                name: true,
                level: true,
                looktype: true,
                vocation: true,
              },
            }
          : false;

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
          players: player,
        },
      });

      if (!account) {
        return res.status(400).json({
          message: "accountNotFound",
        });
      }

      return res.status(200).json({ account });
    } else if (data.type === "filtered") {
      return res.status(200).json({
        message: "The 'filtered' search type is in development",
      });
    }
    return res.status(400).json({
      message: "badReq",
    });
  } else {
    return res.status(405).json({
      message: `You can't ${req.method} this route.`,
    });
  }
}
