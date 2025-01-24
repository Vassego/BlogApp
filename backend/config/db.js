import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`MONGO Connect Error ${error}`);
  }
};

export default connectDB;
