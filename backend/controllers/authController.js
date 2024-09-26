import { redis } from "../config/redis.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateTokes = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });

    const refreshToke = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToke };
};

const storeRefreshToken = async (userId, refreshToke) => {
    await redis.set(`refresh_token:${userId}`, refreshToke, "EX", 7 * 24 * 60 * 60);
};

const setCookies = (res, accessToken, refreshToke) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // prevent xss attacks,cross-site scripting attack
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prevents scrf attack, cross-site reuest forgery attack
        maxAge: 15 * 60 * 1000, //15 minute
    });
    res.cookie("refreshToke", refreshToke, {
        httpOnly: true, // prevent xss attacks,cross-site scripting attack
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prevents scrf attack, cross-site reuest forgery attack
        maxAge: 7 * 60 * 1000, //7 days
    });
};

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({ name, email, password });

        // authenticate
        const { accessToken, refreshToke } = generateTokes(user._id);
        await storeRefreshToken(user._id, refreshToke);

        setCookies(res, accessToken, refreshToke);

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    res.send("login route called");
};

export const logout = async (req, res) => {
    try {
        const refreshToke = req.cookies.refreshToke;
        if (refreshToke) {
            const decoded = jwt.verify(refreshToke, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server errror", error: error.message });
    }
};
