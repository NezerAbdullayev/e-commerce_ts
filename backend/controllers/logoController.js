import Logo from "../models/LogoModel.js";

export const getAppLogo = async (req, res) => {
    try {
        const logo = await Logo.find({});
        res.status(200).json(logo);
    } catch (error) {
        console.log("Error in getAppLogo controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateLogo = async (req, res) => {
    try {
        const { logo } = req.body;

        if (!logo && logo.length < 3) {
            return res.status(404).json({ message: "Logo not found" });
        }

        const updatedLogo = await Logo.findOneAndUpdate({}, { logo }, { new: true });

        if (!updatedLogo) {
            return res.status(404).json({ message: "Logo not found" });
        }

        res.status(200).json(updatedLogo);
    } catch (error) {
        console.log("Error in updateLogo controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
