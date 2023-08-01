import mongoose from "mongoose";
import app from "./app";
import config from './app/config/index';

const port = 4001;

const connectionString = () => {
  try {
    mongoose.connect(config.database_url as string);
    console.log('Congratulations 🎯'); 
    console.log(`🛢️ Database Connected Successfully!`)

    app.listen(port, () => {
      console.log(`⌚ Smart Watch Project Live On http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

connectionString();
