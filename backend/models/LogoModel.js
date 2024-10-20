import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true,
    },
});

const Logo = mongoose.model("Logo", logoSchema);
export default Logo;
