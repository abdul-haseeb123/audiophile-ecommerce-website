"use client";

import Link from "next/link";
import { IconCart } from "@/icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { IconHamburger } from "@/icons";
import { ProductHighlight } from "./product-highlight";
import { useRef, useEffect, useState } from "react";

type Props = {
  variant?: "primary" | "secondary";
};

export function Navbar({ variant = "primary" }: Props) {
  const pathname = usePathname();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const toggleMobileNav = () => setShowMobileNav((prev) => !prev);

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
    <>
      <header
        className={cn(
          "w-full bg-black",
          variant == "secondary" && "bg-transparent",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex w-full max-w-screen-lg items-center justify-between border-b border-b-black px-1 py-3",
            variant == "secondary" && "border-b-2 border-white-almost/20",
          )}
        >
          <div className="flex w-full items-center gap-3 sm:justify-start md:w-fit">
            <button className="group pl-3 md:hidden" onClick={toggleMobileNav}>
              <IconHamburger className="stroke-2 group-hover:fill-beige-dark" />
            </button>
            <h1 className="mx-auto text-2xl font-bold text-white sm:mx-0">
              audiophile
            </h1>
          </div>

          <ul className="hidden items-center gap-4 text-subtitle text-white md:flex">
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
          <button className={"group"}>
            <IconCart className="fill-white group-hover:fill-beige-dark" />
          </button>
        </nav>
      </header>
      <ul
        className={cn(
          "absolute grid w-full gap-3 bg-white p-8 transition-all duration-500 sm:grid-cols-3 md:hidden",
          {
            "-translate-x-full": !showMobileNav,
            "": showMobileNav,
          },
        )}
      >
        <ProductHighlight category="headphones" href="/headphones" />
        <ProductHighlight category="speakers" href="/speakers" />
        <ProductHighlight category="earphones" href="/earphones" />
      </ul>
    </>
  );
}
