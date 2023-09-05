import { z } from "zod";

export const validateCreateComment = z.object({
  body: z.object({
    comment: z.string({ required_error: "Comment Is Required !" }),
  }),
});
