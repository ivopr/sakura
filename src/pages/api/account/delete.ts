// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { accounts } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../services/prisma";

type Data = {
  account?: Partial<accounts>;
  message?: string;
};

type BodyData = {
  idToDelete: number;
  confirmation: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "DELETE") {
    const data: BodyData = req.body;

    const account = await prisma.accounts.findFirst({
      where: {
        id: { equals: data.idToDelete },
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

    const deletedAccount = await prisma.accounts.delete({
      where: {
        id: data.idToDelete,
      },
      select: {
        name: true,
        creation: true,
      },
    });

    return res.status(200).json({
      account: deletedAccount,
    });
  } else {
    return res.status(405).json({
      message: `You can't ${req.method} this route.`,
    });
  }
}
