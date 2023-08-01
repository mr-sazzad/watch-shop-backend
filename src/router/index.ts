import { Router } from "express";

import watchesRouter from "../app/products/productsRoutes";
import usersRouter from "../app/users/userRoutes";

const router = Router();

router.use("/watches", watchesRouter);
router.use("/users", usersRouter);

export default router;
