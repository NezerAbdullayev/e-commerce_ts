import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors";
import { connectDB } from "./config/db.js";

// routes
import productRouter from "./routes/productRoute.js";
import authRouter from "./routes/authRoute.js";
import cartRouter from "./routes/cartRoute.js"

dotenv.config();

//app config
const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors());

// api entpoints
app.use("/images", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);


app.subscribe;

const api = process.env.API_URL;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

    // db connextion
    connectDB();
});
