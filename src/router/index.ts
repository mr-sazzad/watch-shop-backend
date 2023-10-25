import { Router } from "express";

import commentRoutes from "../app/comments/commentsRoutes";
import watchesRouter from "../app/products/productsRoutes";
import usersRouter from "../app/users/userRoutes";

const router = Router();

router.use("/watches", watchesRouter);

router.use("/users", usersRouter);

router.use("/comment", commentRoutes);

export default router;
