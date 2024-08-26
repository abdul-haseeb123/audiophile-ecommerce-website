import Product from "@/models/product.model";
import dbConnect from "./db";

type IncludeType = {
  item: string;
  quantity: number;
};

type otherProductType = {
  name: string;
  slug: string;
  category: string;
  productImage: string;
};

export type ProductDetail = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  new: boolean;
  description: string;
  features: string;
  productImage: string;
  category: "headphones" | "earphones" | "speakers";
  includes: IncludeType[];
  gallery: string[];
  others?: otherProductType[];
};

export type ProductCategory = {
  _id: string;
  name: string;
  slug: string;
  category: "headphones" | "earphones" | "speakers";
  description: string;
  productImage: string;
  new: boolean;
};

export const getProductByCategoryAndSlug = async (
  category: string,
  slug: string,
) => {
  try {
    await dbConnect();
    const mainProduct: ProductDetail | null = await Product.findOne({
      category,
      slug,
    });
    if (!mainProduct) return null;
    const otherProducts = await Product.find({ slug: { $ne: slug } }).limit(3);
    mainProduct.others = otherProducts.map((product) => ({
      name: product.name,
      slug: product.slug,
      category: product.category,
      productImage: product.productImage,
    }));
    return mainProduct;
  } catch (error) {
    console.error(error);
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    await dbConnect();
    const products = await Product.find({ category }).sort("-new");
    const result: ProductCategory[] = products.map((product) => ({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      new: product.new,
      description: product.description,
      productImage: product.productImage,
    }));
    return result;
  } catch (error) {
    console.error(error);
  }
};
