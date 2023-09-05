import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import { IUser } from "./userInterface";
import { userModel } from "./userModel";

const createUser = async (user: IUser) => {
  const result = await userModel.create(user);
  return result;
};

const loginUser = async (user: IUser) => {
  const { email, password } = user;

  const validUser = await userModel.findOne({ email });

  if (!validUser) {
    throw new Error("something went wrong !");
  }

  const match = await bcrypt.compare(password, validUser.password);

  if (!match) {
    throw new Error("something went wrong !");
  }

  const accessToken = jwt.sign(
    { id: validUser._id, email: validUser.email },
    config.secret_key as string,
    { expiresIn: "365d" }
  );

  const refreshToken = jwt.sign(
    { id: validUser._id, email: validUser.email },
    config.secret_key as string,
    { expiresIn: "365d" }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const userServices = {
  createUser,
  loginUser,
};
