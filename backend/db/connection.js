import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../../config.env" });

const ConnectMongo = () => {
  const link = process.env.MONGO_LINK.replace(
    "<PASSWORD>",
    process.env.MONGO_PASSWORD
  );

  try {
    mongoose.connect(link).then(() => {
      console.log("Connected to Mongo Database");
    });
  } catch (error) {
    console.log(error);
  }
};

export default ConnectMongo;
