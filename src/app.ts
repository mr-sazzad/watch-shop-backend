import cors from "cors";
import express, { NextFunction, Request, Response, urlencoded } from "express";
import ApplicationRoutes from "./router/index";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.status(201).json({
    statusCode: 200,
    message: "Welcome To Watch Shop 🎉",
    project_Start_On: "31/07/2023 🎁",
    author: "Sajjad Karim",
    description: "Watch Shop is a practice project 🎯",
  });
});

// watches routes
app.use("/api/v1", ApplicationRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  next();
});

export default app;
