"use client";

import React, { useRef } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Radio = React.forwardRef<HTMLInputElement, Props>(
  ({ label, name, value, checked, onChange, ...props }, ref) => {
    const radioRef = useRef<HTMLInputElement | null>(null);
    const handleRadioClick = () => {
      if (radioRef.current) {
        radioRef.current.checked = true;
        if (onChange) {
          onChange({
            target: radioRef.current,
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }
    };
    return (
      <div
        className={cn(
          "group flex min-w-72 cursor-pointer gap-2 rounded-lg px-4 py-3 outline-double outline-1 outline-white-cloud hover:outline-beige-dark has-[:checked]:outline-beige-dark",
        )}
        onClick={handleRadioClick}
      >
        <div className="grid place-items-center">
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="peer col-start-1 row-start-1 size-5 shrink-0 appearance-none rounded-full border border-white-cloud"
            ref={(e) => {
              if (ref) {
                if (typeof ref === "function") {
                  ref(e);
                } else {
                  (
                    ref as React.MutableRefObject<HTMLInputElement | null>
                  ).current = e;
                }
              }
              radioRef.current = e;
            }}
            {...props}
          />

          <div className="col-start-1 row-start-1 size-[0.6rem] rounded-full peer-checked:bg-beige-dark" />
        </div>

        <Label htmlFor={name} className="text-[14px] text-black">
          {label}
        </Label>
      </div>
    );
  },
);

Radio.displayName = "Radio";
