// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sign } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "node:crypto";

import { prisma } from "../../../services/prisma";

type Data = {
  session?: {
    token: string;
    refreshToken?: string;
  };
  message?: string;
};

type BodyData = {
  name: string;
  password: string;
  rememberMe?: "true" | "false";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "POST") {
    const data: BodyData = req.body;

    const account = await prisma.accounts.findFirst({
      where: {
        name: { equals: data.name },
      },
    });

    if (!account) {
      return res.status(400).json({
        message: "wrongCredentials",
      });
    }

    if (data.password.length < 5) {
      return res.status(400).json({
        message: "passwordLength",
      });
    }

    const hashedPassword = createHash("sha1").update(data.password).digest("hex");

    if (account.password !== hashedPassword) {
      return res.status(401).json({
        message: "wrongCredentials",
      });
    }

    const JWTPayload = {
      email: account.email,
      type: account.type,
    };

    const token = sign(JWTPayload, `${process.env.JWTOKEN_SECRET}`, {
      expiresIn: "1h",
    });

    const refreshToken = sign(JWTPayload, `${process.env.JWTOKEN_REFRESH_SECRET}`, {
      expiresIn: "10d",
    });

    await prisma.sword_sessions.create({
      data: {
        account_id: account.id,
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
