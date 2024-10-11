import Category from "../models/categoryModel.js"


export const getAllCategory=async(_,res)=>{
    try {
        const categories=await Category.find({});
        res.status(200).json(categories); 


    } catch (error) {
        console.log("Error in getAllCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



export const  createCategory=async(req,res)=>{
    try {
        const {name}=req.body

        if(!name){
            return res.status(404).json({error:"Name is required!"})
        }

        const existingCayegory= await Category.findOne({name})

        if(existingCayegory) return res.status(404).json({error:"Already exists"})

        const category=await Category.create({name})

        res.status(201).json({
            _id:category._id,
            name:category.name
        })

    } catch (error) {
        console.log("Error in createCategory controller", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



export const  deleteCategory =async(req,res)=>{
    try {
        const removed=await Category.findByIdAndDelete(req.params.id)
        return res.json(removed)
    } catch (error) {
        console.log("Error in deleteCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
export const updateCategory=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params
    
        if(!id || !name)
            return res.status(404).json({message:"Category not found"});
    
        const category= await Category.findOne({_id:id});
    
        if(!category)
            return res.status(404).json({message:"Category not found"});
    
        category.name=name 
    
        const updatedCategory=await category.save()

        res.status(200).json(updatedCategory)
    } catch (error) {
        console.log("Error in updateCategory  controller", error.message); 
        res.status(500).json({ message: "Server error", error: error.message });
    }
}