import { getProductsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductPageHeading } from "@/components/product-page-heading";
import { ProductsHighlight } from "@/components/products-highlight";
import { BestGearCard } from "@/components/best-gear-card";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  // check if category is valid, i.e it is either "headphones" or "speakers" or "earphones"
  if (!["headphones", "speakers", "earphones"].includes(category)) {
    throw new Error("Invalid category");
  }

  const products = await getProductsByCategory(category);
  if (!products || products.length === 0) {
    throw new Error("No products found");
  }

  return (
    <>
      <Navbar />
      <ProductPageHeading title={category} />
      <div className="mt-12 flex flex-col items-center gap-10">
        {products.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            direction={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
      <div className="pt-32">
        <ProductsHighlight />
      </div>
      <BestGearCard />
      <Footer />
    </>
  );
}
