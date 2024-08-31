"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";
import { ProductPageHeading } from "@/components/product-page-heading";
import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
  return (
    <section className="mx-auto mt-12 flex w-full max-w-screen-lg snap-center flex-col items-center gap-5 px-6 lg:flex-row lg:justify-center lg:gap-7 lg:px-0">
      <Skeleton className="h-80 w-full md:hidden" />
      <Skeleton className="hidden size-72 sm:hidden md:block lg:hidden" />
      <Skeleton className="hidden size-72 rounded-lg lg:block" />
      <div className="mx-auto flex w-80 flex-col justify-start gap-3 text-center sm:w-96 sm:justify-center lg:justify-start lg:text-left">
        <Skeleton className="h-4 w-24 sm:mx-auto lg:mx-0" />
        <Skeleton className="h-8 w-52 sm:mx-auto lg:mx-0" />
        <Skeleton className="h-4 w-52 sm:mx-auto lg:mx-0" />
        <Skeleton className="h-8 w-24 sm:mx-auto lg:mx-0" />
      </div>
    </section>
  );
}

export default function Loading() {
  const pathname = usePathname();
  return (
    <>
      <Navbar />
      <ProductPageHeading title={pathname.slice(1)} />
      <div className="mt-12 flex flex-col items-center gap-10">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
      <Footer />
    </>
  );
}
