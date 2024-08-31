"use client";
import { useCart } from "@/context/cart-provider";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IconCart } from "@/icons";
import CldImage from "./ui/cld-image";
import { Button } from "./ui/button";
import { ProductInCart } from "@/types/product-in-cart";
import { useRouter } from "next/navigation";
import { shortenProductName } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export function Cart() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    addToCart,
    removeFromCart,
    getTotalCartValue,
    clearCart,
  } = useCart();
  const router = useRouter();

  const handleAddItem = (product: ProductInCart) => {
    product.quantity += 1;
    addToCart(product);
  };
  const handleRemoveItem = (product: ProductInCart) => {
    if (product.quantity == 1) {
      removeFromCart(product);
    } else {
      product.quantity -= 1;
      addToCart(product);
    }
  };

  return (
    <Dialog.Root open={isCartOpen} onOpenChange={setIsCartOpen}>
      <Dialog.Trigger asChild>
        <button className="group">
          <IconCart className="fill-white group-hover:fill-beige-dark" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50" />
        <Dialog.Content className="fixed right-1/2 top-[10%] grid w-full max-w-[22rem] translate-x-1/2 gap-4 rounded-lg bg-white p-6 sm:right-12 sm:max-w-sm sm:-translate-x-0">
          <VisuallyHidden.Root>
            <Dialog.Description>Dialog for cart</Dialog.Description>
          </VisuallyHidden.Root>
          {cart.length === 0 ? (
            <div className="grid h-64 place-content-center">
              <h1 className="text-4xl">No Products Added To Cart Yet</h1>
            </div>
          ) : (
            <>
              <div className="flex">
                <Dialog.Title className="text-[18px] font-bold">
                  Cart({cart.length})
                </Dialog.Title>
                <button
                  className="ml-auto w-fit text-[15px] font-medium text-beige-dark hover:underline"
                  onClick={() => clearCart()}
                >
                  Remove all
                </button>
              </div>

              <div className="grid gap-2">
                {cart.length > 0 &&
                  cart.map((product) => (
                    <div key={product.slug} className="flex items-center gap-3">
                      <CldImage
                        src={product.productImage}
                        alt={product.name}
                        width={150}
                        height={150}
                        aspectRatio={1}
                        className="w-16 rounded-lg"
                      />
                      <div>
                        <p className="text-[15px] font-bold">
                          {shortenProductName(product.name)}
                        </p>
                        <p className="text-[14px] font-bold text-black/50">
                          ${product.price}
                        </p>
                      </div>
                      <div className="ml-auto flex w-24 items-center justify-between bg-white-cloud px-2 py-1">
                        <button
                          className="text-xl text-black/55 hover:text-black"
                          onClick={() => handleAddItem(product)}
                        >
                          +
                        </button>
                        <span className="font-bold">{product.quantity}</span>
                        <button
                          className="text-xl text-black/55 hover:text-black disabled:opacity-50 disabled:hover:text-current"
                          onClick={() => handleRemoveItem(product)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <div className="mt-4 flex items-center px-2">
                  <h4 className="text-[15px] font-medium uppercase text-black/55">
                    Total
                  </h4>
                  <h4 className="ml-auto text-[18px] font-bold">
                    ${getTotalCartValue()}
                  </h4>
                </div>
                <div className="mt-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push("/checkout");
                    }}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
