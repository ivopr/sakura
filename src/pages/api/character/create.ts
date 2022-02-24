// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { players } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../services/prisma";

type BodyData = {
  name: string;
};
type Data = {
  character?: Partial<players>;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: "not-logged-in",
      });
    }

    const account = await prisma.accounts.findFirst({
      where: {
        id: { equals: session.id as number },
      },
    });

    if (!account) {
      return res.status(401).json({
        message: "invalid-session",
      });
    }

    const data = req.body as BodyData;

    const character = await prisma.players.create({
      data: {
        conditions: Buffer.from([]),
        name: data.name,
        accounts: {
          connect: {
            id: session.id as number,
          },
        },
      },
    });

    return res.status(201).json({
      character: character,
    });
  } else {
    return res.status(405).json({
      message: `You can't ${req.method} this route.`,
    });
  }
}
