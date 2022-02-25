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
  images?: Partial<string>[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  if (req.method === "GET") {
    const data = req.query as unknown as QueryData;

    if (data.type === "all") {
      const images: string[] = [
        "https://cdn.pixabay.com/photo/2018/03/11/12/53/magic-3216677_960_720.png",
        "https://i.pinimg.com/originals/af/23/d7/af23d77daf8a8b32587f3f436e3c3806.jpg",
      ];

      return res.status(200).json({ images });
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
