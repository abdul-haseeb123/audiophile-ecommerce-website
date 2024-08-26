import mongoose from "mongoose";

const includeSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["headphones", "earphones", "speakers"],
  },
  new: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: String,
    required: true,
  },
  includes: {
    type: [includeSchema],
    required: true,
    default: [],
  },
  productImage: {
    type: String,
    required: true,
  },
  gallery: {
    type: [String],
    required: true,
  },
});

// check if the model is already defined
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
