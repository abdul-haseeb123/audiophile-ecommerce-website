import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ProductCategory } from "@/lib/products";
import CldImage from "./ui/cld-image";

type Props = {
  product: ProductCategory;
  direction: "left" | "right";
};

export function ProductCard({ product, direction }: Props) {
  return (
    <section
      className={cn(
        "mx-auto mt-12 flex w-full max-w-screen-lg snap-center flex-col items-center gap-5 px-6 lg:justify-evenly lg:gap-0 lg:px-0",
        {
          "lg:flex-row-reverse": direction === "right",
          "lg:flex-row": direction === "left",
        },
      )}
    >
      <CldImage
        src={product.productImage}
        alt={product.name}
        className="h-80 w-full object-scale-down md:hidden"
        width={654}
        height={704}
      />
      <CldImage
        src={product.productImage}
        alt={product.name}
        className="hidden h-96 w-full object-scale-down sm:hidden md:block lg:hidden"
        width={1378}
        height={704}
      />
      <CldImage
        src={product.productImage}
        alt={product.name}
        className="hidden w-96 rounded-lg object-scale-down lg:block"
        width={1080}
        height={1120}
        crop={"scale"}
      />
      <div className="flex w-80 flex-col gap-3 text-center sm:w-96 lg:text-left">
        {product.new && (
          <span className="text-overline uppercase text-beige-dark">
            New Product
          </span>
        )}
        <h2 className="text-3xl md:text-5xl">{product.name}</h2>
        <p className="text-base text-black/65">{product.description}</p>
        <Link href={`/${product.category}/${product.slug}`}>
          <Button className="mx-auto mt-2 w-fit lg:mx-0">See Product</Button>
        </Link>
      </div>
    </section>
  );
}
