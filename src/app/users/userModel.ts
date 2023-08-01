import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { IUser } from "./userInterface";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(user.password, 10);

  next();
});

export const userModel = model("User", userSchema);
