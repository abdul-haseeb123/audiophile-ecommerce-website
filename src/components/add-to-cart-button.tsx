"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/context/cart-provider";

type AddToCartButtonProps = {
  slug: string;
  name: string;
  price: number;
  productImage: string;
};

export function AddToCartButton({
  slug,
  name,
  price,
  productImage,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="flex gap-2">
      <div className="mt-6 flex w-28 items-center justify-between bg-white-cloud px-4">
        <button
          className="text-xl text-black/55 hover:text-black"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
        <span className="font-bold">{quantity}</span>
        <button
          className="text-xl text-black/55 hover:text-black disabled:opacity-50 disabled:hover:text-current"
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          disabled={quantity === 1}
        >
          -
        </button>
      </div>
      <Button
        className="mt-6 w-fit"
        onClick={() => {
          addToCart({
            slug,
            name,
            quantity,
            price,
            productImage,
          });
        }}
      >
        Add to cart
      </Button>
    </div>
  );
}
