import { Router } from "express";
import {
  getAllWatches,
  getRecentWatches,
  getSingleWatch,
  postSingleWatch,
} from "./productsController";

const router = Router();

// Route to get all watches
router.get("/", getAllWatches);

// Route to get recent watches
router.get("/recent", getRecentWatches);

// Route to get a single watch by ID
router.get("/:id", getSingleWatch);

// Route to create a new watch
router.post("/new", postSingleWatch);

export default router;
