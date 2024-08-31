import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-provider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Mentor | Audiophile e-commerce website",
  description: "Personal Portfolio project for ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} overflow-x-hidden bg-white-almost`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
