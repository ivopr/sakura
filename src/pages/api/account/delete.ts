// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { accounts } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../services/prisma";

type Data = {
  account?: Partial<accounts>;
  message?: string;
};

type BodyData = {
  confirmation: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "DELETE") {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    console.log(session);

    const data: BodyData = req.body;

    const account = await prisma.accounts.findFirst({
      where: {
        name: { equals: session.user?.name as string },
      },
    });

    if (!account) {
      return res.status(400).json({
        message: "Couldn't find the specified account.",
      });
    }

    if (data.confirmation !== account.name) {
      return res.status(400).json({
        message: "Couldn't validate this deletion",
      });
    }

    await prisma.accounts.delete({
      where: {
        name: session.user?.name as string,
      },
    });

    return res.status(200).json({});
  } else {
    return res.status(405).json({
      message: `You can't ${req.method} this route.`,
    });
  }
}
