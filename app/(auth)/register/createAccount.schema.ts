import { z } from "zod";

export const CreateAccountSchema = z
  .object({
    name: z.string().min(4),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    email: z.string().email(),

    realName: z.string().optional(),
    pronoun: z.enum(["HE", "SHE"]).optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export type CreateAccountType = z.infer<typeof CreateAccountSchema>;
