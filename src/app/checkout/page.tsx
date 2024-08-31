"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { CheckoutForm } from "@/components/checkout-form";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-provider";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  if (cart.length === 0) {
    return null;
  }
  return (
    <>
      <Navbar />
      <div className="mx-4 mt-14 grid max-w-screen-lg gap-4 lg:mx-auto">
        <button className="w-fit text-base text-black/55 hover:text-beige-dark focus:text-beige-dark active:text-beige-dark">
          Go Back
        </button>
        <CheckoutForm />
      </div>
      <Footer />
    </>
  );
}
