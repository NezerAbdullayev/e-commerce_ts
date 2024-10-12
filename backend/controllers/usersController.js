import User from "../models/userModel.js";


export const getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 

    try {

        const users = await User.find({ name: { $ne: 'admin' } }) 
            .sort({ $natural: -1 }) 
            .limit(limit) 
            .skip((page - 1) * limit)
            .select('_id name email'); 

        const totalUsers = await User.countDocuments({ name: { $ne: 'admin' } }); 

        res.json({
            users,
            currentPage: page, 
            totalPages: Math.ceil(totalUsers / limit), 
            totalUsers, 
        });
    } catch (error) {
        console.log("Error in getAllUsers controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};





export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedUser = await User.findByIdAndDelete(id); 

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.log("Error in deleteUser controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};