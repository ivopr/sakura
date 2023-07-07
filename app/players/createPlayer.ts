import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

import { prisma } from "@/services/prisma";

import { authOptions } from "../api/auth/[...nextauth]/route";

type Data = {
  message?: string;
};

export async function createPlayer(
  data: Prisma.playersCreateInput
): Promise<Data> {
  try {
    // @ts-ignore
    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        message: "unauthenticated",
      };
    }

    const account = await prisma.accounts.findFirst({
      where: {
        id: { equals: session.user.id as number },
      },
    });

    if (!account) {
      return {
        message: "unauthenticated",
      };
    }

    const character = await prisma.players.findFirst({
      where: {
        name: { equals: data.name },
      },
    });

    if (character) {
      return {
        message: "name-already-used",
      };
    }

    await prisma.players.create({
      data: {
        ...data,
        accounts: {
          connect: {
            id: Number(session.user.id),
          },
        },
        conditions: Buffer.from([]),
      },
    });

    return {
      message: "created",
    };
  } catch {
    return {
      message: "not-created",
    };
  }
}
