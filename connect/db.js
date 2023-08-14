import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Database connnected successfully... ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;
