import ApiError from "../errors/apiError";
import { watchModel } from "../products/productsModel";
import { ICommentDocument } from "./commentsInterface";

const postComment = async (id: string, payload: ICommentDocument) => {
  try {
    const product = await watchModel.findOne({ _id: id });

    if (!product) {
      throw new Error("Product not found");
    }

    const name = payload.user?.name || "";

    const newComment = {
      comment: payload?.comment,
      name,
    };

    const updatedComments = [...product.comments, newComment];

    await watchModel.updateOne({ _id: id }, { comments: updatedComments });

    return updatedComments;
  } catch (error: any) {
    console.log("An error occurred while pushing the comment!", error.message);
  }
};

const getAllComments = async (id: string) => {
  if (!id || id === undefined) {
    throw new Error("ID NOT FOUND !");
  }

  const isExist = await watchModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(404, "Watch Not Found !");
  }

  const product = await watchModel.findById({ _id: id });
  const comments = product?.comments;

  return comments;
};

export const commentService = {
  postComment,
  getAllComments,
};
