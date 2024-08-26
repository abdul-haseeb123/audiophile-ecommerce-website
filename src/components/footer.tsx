"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { IconFacebook, IconInstagram, IconTwitter } from "@/icons";

export function Footer() {
  const pathname = usePathname();
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Headphones",
      href: "/headphones",
    },
    {
      name: "Speakers",
      href: "/speakers",
    },
    {
      name: "Earphones",
      href: "/earphones",
    },
  ];
  return (
    <footer className="relative mt-24 w-full bg-charcoal pb-8 pt-16 sm:px-8">
      <span className="absolute left-[40%] top-0 h-1 w-24 rounded-lg bg-beige-dark sm:left-10 xl:left-40"></span>
      <div className="mx-4 flex max-w-screen-lg flex-col gap-5 lg:mx-auto">
        <div className="flex flex-col justify-start gap-6 lg:flex-row lg:justify-between">
          <h1 className="text-center text-2xl font-bold text-white sm:mx-0 sm:text-left">
            audiophile
          </h1>
          <ul className="flex flex-col items-center gap-4 text-subtitle text-white sm:flex-row">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "uppercase hover:text-beige-dark active:text-beige-dark",
                    {
                      "text-beige-dark":
                        (link.href === "/" && pathname === "/") ||
                        (link.href !== "/" && pathname.startsWith(link.href)),
                    },
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex max-w-96 flex-col gap-5 text-subtitle text-white/65">
            <p className="mx-auto w-full text-center sm:text-left lg:w-full">
              Audiophile is an all in one stop to fulfill your audio needs.
              We&apos;re a small team of music lovers and sound specialists who
              are devoted to helping you get the most out of personal audio.
              Come and visit our demo facility - we&apos;re open 7 days a week.
            </p>
            <p className="w-full text-center sm:text-left">
              Copyright 2021. All Rights Reserved
            </p>
          </div>
          <div className="mx-auto mt-8 flex items-center gap-3 self-end sm:mx-0 sm:mt-0 lg:self-auto">
            <button className="group">
              <IconFacebook className="fill-white group-hover:fill-beige-dark" />
            </button>
            <button className="group">
              <IconInstagram className="fill-white group-hover:fill-beige-dark" />
            </button>
            <button className="group">
              <IconTwitter className="fill-white group-hover:fill-beige-dark" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
