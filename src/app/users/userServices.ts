import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import ApiError from "../errors/apiError";
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
    throw new Error("Unauthorized !");
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

const getCurrentUser = async (token: string) => {
  const JWT = token.split(" ")[1];

  if (!JWT) {
    throw new ApiError(400, "Unauthorized");
  }

  const decode = jwt.verify(
    JWT,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  const user = await userModel.findOne({ email: decode.email });

  if (!user) {
    throw new ApiError(404, "NOT FOUND");
  }

  return user;
};

export const userServices = {
  createUser,
  loginUser,
  getCurrentUser,
};
