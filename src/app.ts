import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response, urlencoded } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import ApplicationRoutes from "./router/index";

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 200,
    message: "Welcome To Watch Shop 🎉",
    project_Start_On: "31/07/2023 🎁",
    author: "Sajjad Karim",
    description: "Watch Shop is a practice project 🎯",
  });
});

// watches routes
app.use("/api/v1", ApplicationRoutes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
