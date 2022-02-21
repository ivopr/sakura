// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sign, verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../services/prisma";

type Data = {
  session?: {
    token: string;
    refreshToken?: string;
  };
  message?: string;
};

type BodyData = {
  refreshToken: string;
};

type TokenPayload = {
  email: string;
  type: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "POST") {
    const data: BodyData = req.body;

    if (!data.refreshToken) {
      return res.status(401).json({
        message: "Missing token to refresh",
      });
    }

    const oldTokenPayload = verify(
      data.refreshToken,
      process.env.JWTOKEN_REFRESH_SECRET as string
    ) as TokenPayload;

    if (!oldTokenPayload.email) {
      return res.status(400).json({
        message: "This token isn't one emitted by Sword Athentication or is invalid",
      });
    }

    const swordSession = await prisma.sword_sessions.findFirst({
      where: {
        refresh_token: { equals: data.refreshToken },
      },
    });

    if (!swordSession) {
      return res.status(401).json({
        message: "This token isn't one emitted by Sword Athentication or is invalid or revoked",
      });
    }

    const JWTPayload = {
      email: oldTokenPayload.email,
      type: oldTokenPayload.type,
    };

    const token = sign(JWTPayload, `${process.env.JWTOKEN_SECRET}`, {
      expiresIn: "1h",
    });

    const refreshToken = sign(JWTPayload, `${process.env.JWTOKEN_REFRESH_SECRET}`, {
      expiresIn: "10d",
    });

    await prisma.sword_sessions.create({
      data: {
        account_id: swordSession.account_id,
        refresh_token: refreshToken,
        accessed_at: Number(Date.now().toString().slice(0, 10)),
      },
    });

    return res.status(201).json({
      session: {
        token: token,
        refreshToken: refreshToken,
      },
    });
  } else {
    return res.status(405).json({
      message: `You can't ${req.method} this route.`,
    });
  }
}
