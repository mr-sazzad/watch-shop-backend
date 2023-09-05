import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import { validateCreateComment } from "./commentValidation";
import { getAllComments, postComment } from "./commentsController";

const router = Router();

router.post("/:id", validateRequest(validateCreateComment), postComment);
router.get("/:id", getAllComments);

export default router;
