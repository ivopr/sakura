import { players } from "@prisma/client";

export type SingleAccount = {
  id: number;
  name: string;
  email: string;
  type: number;
  premium_ends_at: number;
  creation: number;
  players?: players[];
} | null;
