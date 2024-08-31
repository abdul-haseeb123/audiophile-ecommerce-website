"use client";

import React, { useState } from "react";
import { IconOrderConfirmation } from "@/icons";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ProductInCart } from "@/types/product-in-cart";
import { cn } from "@/lib/utils";
import { ButtonWithRef as Button } from "./ui/button";
import CldImage from "./ui/cld-image";
import { shortenProductName } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  cart: ProductInCart[];
  open: boolean;
  isDisabled: boolean;
  grandTotal: number;
  setOpen: (open: boolean) => void;
};

export function OrderConfirmationAlert({
  cart,
  open,
  setOpen,
  isDisabled,
  grandTotal,
}: Props) {
  const [seeLess, setSeeLess] = useState(true);
  const router = useRouter();

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Trigger asChild>
        <Button type="submit" className="h-fit w-full" disabled={isDisabled}>
          Checkout
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 grid w-[20.5rem] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg bg-white p-6 sm:w-[34rem]">
          <IconOrderConfirmation />
          <AlertDialog.Title className="text-balance text-[24px] font-bold uppercase leading-7 tracking-[0.86px] sm:text-[32px] sm:leading-9 sm:tracking-[1.14px]">
            Thank you
            <br />
            for your order
          </AlertDialog.Title>
          <AlertDialog.Description className="text-base text-black/50">
            You will receive an email confirmation shortly
          </AlertDialog.Description>
          <div
            className="flex w-full flex-col sm:flex-row"
            onClick={() => setSeeLess(!seeLess)}
          >
            <div className="flex w-full flex-col gap-1 rounded-t-lg bg-white-cloud px-5 pb-2 pt-5 sm:w-3/5 sm:rounded-l-lg sm:rounded-t-none">
              {cart.map((product) => (
                <div
                  key={product.slug}
                  className={cn(
                    "flex items-center gap-6 transition-all duration-1000",
                    {
                      hidden: seeLess,
                    },
                  )}
                >
                  <CldImage
                    src={product.productImage}
                    width={50}
                    height={50}
                    alt={product.name}
                  />
                  <div className="flex flex-col justify-between">
                    <span className="text-base font-bold">
                      {shortenProductName(product.name)}
                    </span>
                    <span className="self-center text-[14px] font-bold leading-6 tracking-[0px] text-black/50">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                  <span className="ml-auto self-start text-base font-bold text-black/50">
                    x{product.quantity}
                  </span>
                </div>
              ))}
              {cart.slice(0, 1).map((product) => (
                <div
                  key={product.slug}
                  className={cn("flex items-center gap-6", {
                    hidden: !seeLess,
                  })}
                >
                  <CldImage
                    src={product.productImage}
                    width={50}
                    height={50}
                    alt={product.name}
                  />
                  <div className="flex flex-col justify-between">
                    <span className="text-base font-bold">
                      {shortenProductName(product.name)}
                    </span>
                    <span className="self-center text-[14px] font-bold leading-6 tracking-[0px] text-black/50">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                  <span className="ml-auto self-start text-base font-bold text-black/50">
                    x{product.quantity}
                  </span>
                </div>
              ))}
              <hr
                className={cn("mt-4 text-black/10", {
                  hidden: cart.length <= 1,
                })}
              />
              <span className="mx-auto mt-2 text-[12px] font-bold text-black/50">
                {seeLess == true && cart.length > 1
                  ? `and ${cart.length - 1} other item`
                  : "See less"}
              </span>
            </div>
            <div className="flex w-full items-end justify-start rounded-b-lg bg-black p-5 sm:w-2/5 sm:rounded-b-none sm:rounded-r-lg">
              <div className="flex flex-col gap-2">
                <span className="text-base uppercase text-white/50">
                  grand total
                </span>
                <span className="text-[18px] font-bold text-white">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <AlertDialog.Action asChild>
            <Button
              className="h-fit w-full uppercase"
              onClick={() => {
                setOpen(false);
                router.push("/");
              }}
            >
              Back to home
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
