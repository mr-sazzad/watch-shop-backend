import { Router } from "express";
import {
  getAllWatches,
  getRecentWatches,
  getSingleWatch,
  postSingleWatch,
} from "./productsController";

const router = Router();

router.get("/", getAllWatches);
router.get("/recent", getRecentWatches);
router.get("/:id", getSingleWatch);
router.post("/new", postSingleWatch);

export default router;
