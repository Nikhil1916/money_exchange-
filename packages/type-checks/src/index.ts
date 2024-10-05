import { z } from "zod";

export const webHookSchema = z.object({
    user_identifier:z.string(),
    amount:z.string(),
    webHookUrl: z.string(),
});



//signup / signin schema
export const signUpSchema = z.object({
    phoneNumber: z.string(),
    password: z.string()
})

export type signUpInput = z.infer<typeof signUpSchema>;