import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { connectDB } from "./config/db";
import productRouter from "routes/productRoute";




dotenv.config(); 

//app config
const app = express();
const port = 3000;


//middleware
app.use(express.json())
app.use(cors());


// db connextion

connectDB()

// api entpoints
app.use("/api/product", productRouter);
app.use("/images",express.static("uploads"))

app.subscribe 




const api = process.env.API_URL; 





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// mongodb+srv://nezer12345:<db_password>@cluster0.ykejw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



// mongodb://nezer12345:<db_password>@cluster0-shard-00-00.ykejw.mongodb.net:27017,cluster0-shard-00-01.ykejw.mongodb.net:27017,cluster0-shard-00-02.ykejw.mongodb.net:27017/?ssl=true&replicaSet=atlas-ve4mnq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
