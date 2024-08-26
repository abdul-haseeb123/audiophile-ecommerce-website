import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { generateSlug } from "@/lib";
import { uploadOnCloudinary } from "@/lib/cloudinary";
import Product from "@/models/product.model";

export async function POST(request: NextRequest) {
  await dbConnect();
  const data = await request.formData();
  const name: string = data.get("name") as string;
  const category: string = data.get("category") as string;
  const price: number = Number(data.get("price"));
  const description: string = data.get("description") as string;
  const features: string = data.get("features") as string;
  const gallery: File[] = data.getAll("gallery") as File[];
  const productImage: File = data.get("productImage") as File;
  const includes: object = JSON.parse(data.get("includes") as string);
  const isNew: boolean = data.get("new") === "true" ? true : false;

  if (
    !name ||
    !price ||
    !description ||
    !features ||
    !productImage ||
    !includes ||
    !category
  ) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 },
    );
  }

  if (name.length < 3) {
    return NextResponse.json(
      { message: "Name must be at least 3 characters" },
      { status: 400 },
    );
  }

  if (description.length < 10) {
    return NextResponse.json(
      { message: "Description must be at least 10 characters" },
      { status: 400 },
    );
  }

  if (features.length < 10) {
    return NextResponse.json(
      { message: "Features must be at least 10 characters" },
      { status: 400 },
    );
  }

  if (price < 0) {
    return NextResponse.json(
      { message: "Price must be a positive number" },
      { status: 400 },
    );
  }

  if (gallery.length < 3) {
    return NextResponse.json(
      { message: "Please upload at least 3 images" },
      { status: 400 },
    );
  }
  // check if category is valid, i.e it is either "headphones" or "speakers" or "earphones"
  if (!["headphones", "speakers", "earphones"].includes(category)) {
    return NextResponse.json({ message: "Invalid category" }, { status: 400 });
  }

  const slug = generateSlug(name);

  const productImageResult = await uploadOnCloudinary(productImage);
  const galleryResult = await Promise.all(
    gallery.map(async (image) => await uploadOnCloudinary(image)),
  );

  const newProduct = new Product({
    name,
    slug,
    category,
    price,
    description,
    features,
    includes,
    productImage: productImageResult.public_id as string,
    gallery: galleryResult.map((image) => image.public_id),
    new: isNew,
  });

  await newProduct.save();

  return NextResponse.json(
    {
      message: "Product added successfully",
      product: newProduct,
    },
    { status: 201 },
  );
}
