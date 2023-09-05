import { RequestHandler } from "express";
import { watchServices } from "./productsServices";

export const getSingleWatch: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await watchServices.getSingleWatch(id as string);

    res.status(201).json({
      statusCode: 201,
      message: "watch retrieved successfully 🎯",
      data: result,
    });
  } catch (err: any) {
    console.log("SINGLE WATCH FETCHING 🦀🦀", err);
    next(err);
  }
};

export const getAllWatches: RequestHandler = async (_req, res) => {
  const result = await watchServices.getAllWatches();

  res.status(201).json({
    statusCode: 201,
    message: "watches retrieved successfully 🎯",
    total: result.total,
    data: result.data,
  });
};

export const postSingleWatch: RequestHandler = async (req, res) => {
  const watch = req.body;
  const result = await watchServices.postSingleWatch(watch);

  res.status(201).json({
    statusCode: 201,
    message: "watch created successfully 🎯",
    data: result,
  });
};

export const getRecentWatches: RequestHandler = async (_req, res) => {
  const result = await watchServices.getRecentWatches();
  const total = result.length;

  res.status(201).json({
    statusCode: 201,
    total: total,
    message: "recent watches retrieved successfully 🎯",
    data: result,
  });
};
