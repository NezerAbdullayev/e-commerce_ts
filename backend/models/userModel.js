import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
        cartItem: [
            {
                name: {
                    type: String,
                },
                image: {
                    type: String,
                },
                price: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                productId: {
                    type: String,
                },
            },
        ],
        favorites: [
            {
                productId: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
            },
        ],
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
        },
    }, // createdAt və updatedAt
    {
        timestamps: true,
    }
);

// pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
