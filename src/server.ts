import mongoose from "mongoose";
import app from "./app";
import config from "./app/config/index";

const port = 4001;

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const startServer = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("🛢️ Database Connected Successfully!");

    app.listen(port, () => {
      console.log(`⌚ Smart Watch Project Live On http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

startServer();

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// const gracefulShutdown = () => {
//   console.log("Gracefully shutting down the server...");
//   mongoose.connection.close((err: Error | null) => {
//     if (err) {
//       console.error("Error closing database connection:", err);
//     } else {
//       console.log("Database connection closed.");
//     }
//     process.exit(0);
//   });
// };

// process.on("SIGINT", gracefulShutdown);
// process.on("SIGTERM", gracefulShutdown);
