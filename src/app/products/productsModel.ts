import { Schema, model } from "mongoose";
import { IWatch } from "./productsInterface";

const watchSchema = new Schema<IWatch>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: { type: String, required: true, enum: ["In-Stock", "Out-Of-Stock"] },
  rating: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [
    {
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

export const watchModel = model("Watch", watchSchema);
