import { Router } from "express";
import { getAllComments, postComment } from "./commentsController";

const router = Router();

router.post("/:id", postComment);
router.get("/:id", getAllComments);

export default router;
