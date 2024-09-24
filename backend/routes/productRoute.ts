import { addProduct, listProduct, removeProduct } from "controllers/productController"
import express from "express"
import multer from "multer"

const productRouter=express.Router()


// image strorage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})


const upload=multer({storage:storage})

// post
productRouter.post("/add",upload.single("image"),addProduct)
// get
productRouter.get("/list",listProduct)

productRouter.post("/remove",removeProduct)
export default productRouter
