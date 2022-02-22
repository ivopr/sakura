// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { guild_ranks } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type QueryData = {
  type: "all" | "one" | "filtered";
  shouldBringRelations?: "true" | "false";
  name?: string;
  email?: string;
  id?: number;
};

type Data = {
  guildRank?: Partial<guild_ranks>;
  guildsRank?: Partial<guild_ranks>[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "GET") {
    const data = req.query as unknown as QueryData;

    if (data.type === "all") {
      const guildsRank: guild_ranks[] = [
        {
          name: "Ivo gay",
          level: 1,
          guild_id: 1,
          id: 1,
        },
      ];

      return res.status(200).json({ guildsRank });
    }
    return res.status(400).json({
      message: "Malformed request, verify your filters and/or the requested search type",
    });
  } else {
    return res.status(405).json({
      message: `You can't ${req.method} this route.`,
    });
  }
}
