import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../services/prisma";
import { AccountUpdateData } from "../../../types/account";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "PUT") {
    try {
      const data: AccountUpdateData = req.body;
      const session = await getSession({ req });

      if (!session || !session.user.id) {
        return res.status(401).json({ message: "unauthenticated" });
      }

      if (!data) {
        return res.status(400).json({ message: "no-update-data" });
      }

      const existingAccount = await prisma.accounts.findFirst({
        where: {
          id: Number(session.user.id),
        },
      });

      if (!existingAccount) {
        return res.status(409).json({
          message: "account-doesnt-exist",
        });
      }

      await prisma.sakura_accounts.update({
        where: {
          account_id: existingAccount.id,
        },
        data: {
          ...data,
        },
      });

      return res.status(201).json({
        message: "updated",
      });
    } catch {
      return res.status(400).json({
        message: "not-updated",
      });
    }
  } else {
    return res.status(405).json({
      message: `You can't ${req.method} this route.`,
    });
  }
}
