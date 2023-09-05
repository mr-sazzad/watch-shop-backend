import { RequestHandler } from "express";
import { userServices } from "./userServices";

export const createUser: RequestHandler = async (req, res) => {
  const user = req.body;
  const result = await userServices.createUser(user);

  const { password, ...rest } = result.toObject();

  res.status(201).json({
    statusCode: 201,
    message: "User Created Successfully !",
    data: rest,
  });
};

export const loginUser: RequestHandler = async (req, res) => {
  const user = req.body;
  const result = await userServices.loginUser(user);

  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 3600000 });

  res.status(201).json({
    statusCode: 201,
    message: "Login successfully!",
    accessToken: accessToken,
  });
};

export const getCurrentUser: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const result = await userServices.getCurrentUser(token as string);

    res.status(200).json({
      statusCode: 200,
      message: "Login successfully!",
      accessToken: result,
    });
  } catch (err: any) {
    next(err);
  }
};
