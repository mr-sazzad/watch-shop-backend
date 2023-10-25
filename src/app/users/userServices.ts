import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import ApiError from "../errors/apiError";
import { IWatch } from "../products/productsInterface";
import { IUser } from "./userInterface";
import { userModel } from "./userModel";

const createUser = async (user: IUser) => {
  const result = await userModel.create(user);
  if (!result) throw new ApiError(409, "Bad request");
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

const AddToCart = async (id: string, data: Partial<IWatch>) => {
  const user = await userModel.findOne({ _id: id });

  if (!user) {
    throw new ApiError(404, "User Not Found !");
  }

  const result = await userModel.findByIdAndUpdate(
    { _id: id },
    { cart: data._id }
  );

  return result;
};

export const userServices = {
  createUser,
  loginUser,
  getCurrentUser,
  AddToCart,
};
