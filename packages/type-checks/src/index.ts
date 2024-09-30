import { z } from "zod";

export const webHookSchema = z.object({
    user_identifier:z.string(),
    amount:z.string(),
    webHookUrl: z.string(),
});