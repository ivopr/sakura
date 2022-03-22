import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../services/prisma";

type Data = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).json({
          message: "unauthenticated",
        });
      }

      const account = await prisma.accounts.findFirst({
        where: {
          id: { equals: session.id as number },
        },
      });

      if (!account) {
        return res.status(401).json({
          message: "unauthenticated",
        });
      }

      const data = req.body as Prisma.playersCreateInput;

      const character = await prisma.players.findFirst({
        where: {
          name: { equals: data.name },
        },
      });

      if (character) {
        return res.status(400).json({
          message: "name-already-used",
        });
      }

      await prisma.players.create({
        data: {
          ...data,
          accounts: {
            connect: {
              id: session.id as number,
            },
          },
          conditions: Buffer.from([]),
        },
      });

      return res.status(201).json({
        message: "created",
      });
    } catch {
      return res.status(400).json({
        message: "not-created",
      });
    }
  } else {
    return res.status(405).json({
      message: `You can't ${req.method} this route.`,
    });
  }
}
