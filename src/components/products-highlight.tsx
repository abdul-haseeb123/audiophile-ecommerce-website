import { ProductHighlight } from "./product-highlight";

export function ProductsHighlight() {
  return (
    <div className="my-32 grid w-full max-w-screen-lg gap-3 px-3 md:grid-cols-3 lg:mx-auto lg:px-0">
      <ProductHighlight category="headphones" href="/headphones" />
      <ProductHighlight category="speakers" href="/speakers" />
      <ProductHighlight category="earphones" href="/earphones" />
    </div>
  );
}
