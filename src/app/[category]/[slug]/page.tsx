import React from "react";
import { getProductByCategoryAndSlug } from "@/lib/products";
import { ProductDetail } from "@/lib/products";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CldImage from "@/components/ui/cld-image";
import { ProductsHighlight } from "@/components/products-highlight";
import { BestGearCard } from "@/components/best-gear-card";
import { AddToCartButton } from "@/components/add-to-cart-button";

export default async function ProductPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const { category, slug } = params;
  if (!["headphones", "speakers", "earphones"].includes(category)) {
    throw new Error("Invalid category");
  }
  const product: ProductDetail | null | undefined =
    await getProductByCategoryAndSlug(category, slug);
  if (!product) {
    throw new Error("Product not found");
  }
  return (
    <>
      <Navbar />
      <div className="mx-3 grid max-w-screen-lg gap-7 overflow-clip lg:mx-auto lg:px-0">
        <Link href={`/${category}`} className="my-12">
          Go back
        </Link>
        <div className="flex flex-col items-center gap-10 md:flex-row lg:h-96 lg:gap-32">
          <CldImage
            src={product.productImage}
            alt={product.name}
            width={654}
            height={654}
            className="h-80 w-full rounded-xl object-scale-down md:hidden"
          />
          <CldImage
            src={product.productImage}
            alt={product.name}
            width={562}
            height={960}
            className="hidden h-[30rem] w-full rounded-xl object-contain md:block lg:hidden"
          />
          <CldImage
            src={product.productImage}
            alt={product.name}
            width={1080}
            height={1120}
            className="hidden w-96 rounded-xl lg:block"
          />

          <div className="mx-auto flex w-80 max-w-[28rem] flex-col justify-center gap-2 md:w-1/2">
            {product.new && (
              <span className="text-overline uppercase text-beige-dark">
                New Product
              </span>
            )}
            <h1 className="text-3xl font-bold md:text-5xl">{product.name}</h1>
            <p className="text-base">{product.description}</p>
            <p className="text-xl">${product.price.toLocaleString()}</p>
            <AddToCartButton
              slug={product.slug}
              name={product.name}
              price={product.price}
              productImage={product.productImage}
            />
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center gap-10 md:gap-28 lg:flex-row lg:items-start">
          <div className="flex w-80 max-w-2xl flex-col gap-3 md:w-full lg:mx-0">
            <h3 className="text-2xl md:text-4xl">FEATURES</h3>
            <div className="space-y-2">
              {product.features.split("\n").map((feature, i) => (
                <p key={i} className="text-base text-black/65">
                  {feature}
                </p>
              ))}
            </div>
          </div>
          <div className="flex w-80 max-w-2xl flex-col gap-3 md:w-full md:flex-row md:justify-normal lg:flex-col lg:justify-normal">
            <h3 className="text-2xl md:text-4xl">IN THE BOX</h3>
            <ul className="flex flex-col gap-2 md:mx-auto lg:mx-0">
              {product.includes.map((data, i) => (
                <li key={i} className="flex gap-2 text-base text-black/65">
                  <span className="font-bold text-beige-dark">
                    {data.quantity}x
                  </span>{" "}
                  {data.item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-20 flex grid-flow-col grid-rows-3 flex-col gap-3 md:mx-auto md:grid md:grid-rows-2 md:gap-3 lg:mx-0 lg:mr-auto lg:gap-4">
          <CldImage
            src={product.gallery[0]}
            alt=""
            width={654}
            height={348}
            className="h-72 w-full rounded-lg object-cover md:hidden"
          />
          <CldImage
            src={product.gallery[1]}
            alt=""
            width={654}
            height={348}
            className="h-72 w-full rounded-lg object-cover md:hidden"
          />
          <CldImage
            src={product.gallery[2]}
            alt=""
            width={654}
            height={736}
            className="h-96 w-full rounded-lg object-cover md:hidden"
          />
          <CldImage
            src={product.gallery[0]}
            alt=""
            width={554}
            height={348}
            className="hidden aspect-auto h-full w-80 rounded-lg object-scale-down md:block lg:hidden"
          />
          <CldImage
            src={product.gallery[1]}
            alt=""
            width={554}
            height={348}
            className="hidden aspect-auto h-full w-80 rounded-lg object-scale-down md:block lg:hidden"
          />
          <CldImage
            src={product.gallery[2]}
            alt=""
            width={790}
            height={736}
            className="hidden aspect-auto h-full w-[28rem] rounded-lg object-scale-down md:row-span-2 md:block lg:hidden"
          />

          <CldImage
            src={product.gallery[0]}
            alt=""
            width={445}
            height={280}
            className="hidden h-full w-96 rounded-lg object-scale-down lg:block"
          />
          <CldImage
            src={product.gallery[1]}
            alt=""
            width={445}
            height={280}
            className="hidden h-full w-96 rounded-lg object-scale-down lg:block"
          />
          <CldImage
            src={product.gallery[2]}
            alt=""
            width={635}
            height={592}
            className="hidden h-full w-[33rem] rounded-lg object-scale-down lg:row-span-2 lg:block"
          />
        </div>
        <div className="mt-20 space-y-6">
          <h3 className="text-center text-2xl uppercase md:text-4xl">
            You may also like
          </h3>
          <div className="mx-auto flex flex-col gap-10 md:flex-row md:gap-3">
            {product.others &&
              product.others.map((other, i) => (
                <div className="flex flex-col justify-center gap-3" key={i}>
                  <CldImage
                    src={other.productImage}
                    alt={other.name}
                    width={700}
                    height={636}
                    className="hidden h-full w-96 rounded-xl object-cover lg:block"
                  />
                  <CldImage
                    src={other.productImage}
                    alt={other.name}
                    width={446}
                    height={636}
                    className="hidden h-full w-96 rounded-xl object-cover md:block lg:hidden"
                  />
                  <CldImage
                    src={other.productImage}
                    alt={other.name}
                    width={654}
                    height={240}
                    className="h-full w-full rounded-xl object-contain md:hidden"
                  />
                  <h4 className="text-center text-2xl">{other.name}</h4>
                  <Link
                    href={`/${other.category}/${other.slug}`}
                    className="mx-auto"
                  >
                    <Button className="mx-auto w-fit text-center">
                      See product
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="mt-28">
          <ProductsHighlight />
        </div>
        <BestGearCard />
      </div>
      <Footer />
    </>
  );
}
