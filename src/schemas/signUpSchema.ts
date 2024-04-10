import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2,"Username must be at least 2 characters long")
    .max(50, "Username can't exceed 50 characters")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain any special characters  other than underscore")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Please enter a valid email address"}),
    password: z.string().min(6,{message:"Password must be at least 8 characters long"})
})