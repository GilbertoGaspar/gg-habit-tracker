import { z } from "zod";

export const RegisterUserSchema = z.object({
  email: z.string().email().trim().min(1),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long"),
  name: z.string().trim().min(1),
});
