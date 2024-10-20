import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Logo", logoSchema);
