import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";

// routes
import productRouter from "./routes/productRoute.js";
import authRouter from "./routes/authRoute.js";
import cartRouter from "./routes/cartRoute.js";
import couponRouter from "./routes/couponRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import analyticsRouter from "./routes/analyticsRoute.js";
import favoritesRouter from "./routes/favoritesRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import usersRouter from "./routes/usersRouter.js";
import logoRouter from "./routes/logoRouter.js";
import orderRouter from "./routes/orderRouter.js"


dotenv.config();

//app config
const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// api entpoints

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/order",orderRouter)
app.use("/api/favorites", favoritesRouter);
app.use("/api/category", categoryRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/logo", logoRouter);

app.subscribe;

const api = process.env.API_URL;

// db connextion
connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
