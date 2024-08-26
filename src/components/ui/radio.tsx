"use client";

import React, { useRef } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  name: string;
  value: string;
};

export function Radio({ label, name, value }: Props) {
  const radioRef = useRef<HTMLInputElement>(null);
  const handleRadioClick = () => {
    if (radioRef.current) {
      radioRef.current.checked = true;
    }
  };
  return (
    <div
      className={cn(
        "group flex min-w-72 cursor-pointer gap-2 rounded-lg px-4 py-3 outline-double outline-2 outline-white-cloud hover:outline-beige-dark",
        {
          "outline-beige-dark": radioRef.current?.checked,
        },
      )}
      onClick={handleRadioClick}
    >
      <div className="grid place-items-center">
        <input
          type="radio"
          name={name}
          value={value}
          className="border-blue-500 peer col-start-1 row-start-1 size-5 shrink-0 appearance-none rounded-full border-2 border-white-cloud"
          ref={radioRef}
        />

        <div className="col-start-1 row-start-1 size-[0.6rem] rounded-full peer-checked:bg-beige-dark" />
      </div>

      <Label htmlFor="name" className="text-base">
        {label}
      </Label>
    </div>
  );
}
