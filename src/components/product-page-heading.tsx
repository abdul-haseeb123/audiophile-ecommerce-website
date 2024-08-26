import React from "react";

export function ProductPageHeading({ title }: { title: string }) {
  return (
    <h1 className="bg-black px-4 py-14 text-center text-3xl uppercase text-white sm:text-5xl">
      {title}
    </h1>
  );
}
