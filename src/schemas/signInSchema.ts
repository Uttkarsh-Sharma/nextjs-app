import { z } from "zod";

export const signInSchema = z.object({
    // we can use email, usernmae , phone number as identifier for user login
    identifier: z.string().length(6,"Verification  code must be 6 digits"),
    password: z.string()
});

