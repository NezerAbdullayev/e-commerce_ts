import { Request, Response } from "express";
import productModel from "models/productModels";
import fs from "fs";

const addProduct = async (req: Request, res: Response) => {
  // Check if file is provided
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Image is required" });
  }

  let image_filename = req.file.filename;

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await product.save();
    res.status(201).json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding product" });
  }
};

// all product list

const listProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find({});

    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.findById(req.body.id);
    fs.unlink(`upload/${product?.image}`, () => {});

    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addProduct, listProduct, removeProduct };
