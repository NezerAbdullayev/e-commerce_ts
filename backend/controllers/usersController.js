import User from "../models/userModel";


export const getAllUsers=async(req,res)=>{
try {
    const users = await User.find();
    res.status(200).json(users);
} catch (error) {
    console.log("Error in getAllUsers controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
}
}



export const deleteUser=async(req,res)=>{
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
}