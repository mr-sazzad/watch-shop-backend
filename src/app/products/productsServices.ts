import { IWatch } from "./productsInterface";
import { watchModel } from "./productsModel";

const getSingleWatch = async (id: string) => {
  const result = await watchModel.findById({ _id: id });
  return result;
};

const getAllWatches = async () => {
  const data = await watchModel.find({}).lean();

  const total = await watchModel.countDocuments();
  return {
    data,
    total,
  };
};

const getRecentWatches = async () => {
  const result = await watchModel.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 8 },
  ]);

  return result;
};

const postSingleWatch = async (watch: IWatch) => {
  const result = await watchModel.create(watch);
  return result;
};

export const watchServices = {
  getAllWatches,
  postSingleWatch,
  getSingleWatch,
  getRecentWatches,
};
