import { RequestHandler } from "express";
import { commentService } from "./commentsService";

export const postComment: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  const result = await commentService.postComment(id, payload);

  res.status(200).json({
    success: true,
    message: "comment added successfully !",
    data: result,
  });
};

export const getAllComments: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    console.log("id", id);

    const result = await commentService.getAllComments(id);

    res.status(201).json({
      success: true,
      message: "all comments retrieved successfully !",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
