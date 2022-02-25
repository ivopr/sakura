// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
        "https://cdn.pixabay.com/photo/2017/08/23/10/45/castle-2672317_960_720.png",
        "https://cdn.pixabay.com/photo/2017/04/03/08/49/rotkappchen-2197756_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/04/25/19/10/water-3350331_960_720.jpg",
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
