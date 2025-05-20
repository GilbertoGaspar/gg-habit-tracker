import { z } from "zod";

export const RegisterUserSchema = z.object({
  email: z.string().email().trim().min(1),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long"),
  name: z.string().trim().min(1),
});

export const habitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  frequency: z.enum(["DAILY", "WEEKLY", "CUSTOM"]),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  icon: z.string().optional(),
});
