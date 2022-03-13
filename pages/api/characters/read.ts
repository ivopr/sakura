// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | { message: string }>
): Promise<void> {
  if (req.method === "GET") {
    return res
      .status(200)
      .json([
        { name: "Monkey D. Luffy" },
        { name: "Portgas D. Funto" },
        { name: "Sabo D. Saparecido" },
      ]);
  }
  return res.status(405).json({
    message: `You can't ${req.method} this route.`,
  });
}
