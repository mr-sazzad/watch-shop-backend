import { z } from "zod";

export const validateProduct = z.object({
  body: z.object({
    name: z.string({ required_error: "Name Is Required !" }),
    image: z
      .string({ required_error: "Image Field Is Required !" })
      .default(""),
    price: z.number({ required_error: "Price Field Is Required !" }),
    status: z.string({ required_error: "Status Field Is Required !" }),
    rating: z
      .number({ required_error: "Rating Field Is Required !" })
      .default(0),
    description: z.string({
      required_error: "Description Field is Required !",
    }),
  }),
});
