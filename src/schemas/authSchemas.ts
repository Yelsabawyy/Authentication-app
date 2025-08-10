import { z } from "zod";

// Register schema
export const registerSchema = z.object({
  username: z.string().nonempty("username is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),

  password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
});

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),

  password: z.string().nonempty("Password is required"),
});


// Reset Password schema
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
});
