import { z } from "zod";

export const userValidation = z.object({
  body: z.object({
    email: z.string({ required_error: "Email Is Required !" }).email(),
    password: z.string({ required_error: "Password Field Is Required !" }),
  }),
});
