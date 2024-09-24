import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb://nezer12345:0707196505@cluster0-shard-00-00.ykejw.mongodb.net:27017,cluster0-shard-00-01.ykejw.mongodb.net:27017,cluster0-shard-00-02.ykejw.mongodb.net:27017/e-commerce?ssl=true&replicaSet=atlas-ve4mnq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  ).then(()=>console.log("db connected"));
};

// const connectDB = async () => {
//   await mongoose.connect(
//     "mongodb+srv://nezer12345:0707196505@cluster0.ykejw.mongodb.net/e-commerce"
//   );
// };
