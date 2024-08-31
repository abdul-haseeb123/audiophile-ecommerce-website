import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Loading() {
  return (
    <>
      <Navbar />
      <div className="mx-3 mt-16 grid max-w-screen-lg gap-7 overflow-clip lg:mx-auto lg:px-0">
        <div className="flex flex-col items-center gap-10 md:flex-row lg:h-96 lg:gap-32">
          <Skeleton className="size-80 rounded-xl sm:size-96" />
          <div className="mx-auto flex w-80 max-w-[28rem] flex-col justify-center gap-2 md:w-1/2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-20 w-56" />
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
