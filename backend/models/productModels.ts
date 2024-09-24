import mongoose, { Document, Schema, Model } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const productModel: Model<IProduct> =
  mongoose.models.product || mongoose.model<IProduct>("product", productSchema);

export default productModel;
