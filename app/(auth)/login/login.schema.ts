import { z } from "zod";

export const LoginSchema = z.object({
  name: z.string().min(4).nonempty("Account name required!"),
  password: z.string().min(8).nonempty("Password required!"),
});

export type LoginType = z.infer<typeof CreateAccountSchema>;
