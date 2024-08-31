"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ProductInCart } from "@/types/product-in-cart";

type CartContextType = {
  cart: ProductInCart[];
  addToCart: (product: ProductInCart) => void;
  removeFromCart: (product: ProductInCart) => void;
  clearCart: () => void;
  getTotalCartValue: () => string;
  calculateVAT: () => number;
  getGrandTotal: () => number;
  shippingCost: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotalCartValue: () => "0",
  calculateVAT: () => 0,
  getGrandTotal: () => 0,
  shippingCost: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
});

const useCart = () => useContext(CartContext);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<ProductInCart[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const firstRender = useRef(true);
  const shippingCost = 50;

  useEffect(() => {
    if (firstRender.current) {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
      firstRender.current = false;
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  function addToCart(product: ProductInCart) {
    const productIndex = cart.findIndex((p) => p.slug === product.slug);
    if (productIndex === -1) {
      setCart([...cart, product]);
    } else {
      const newCart = [...cart];
      newCart[productIndex].quantity = product.quantity;
      setCart(newCart);
    }
  }

  function removeFromCart(product: ProductInCart) {
    const newCart = cart.filter((p) => p.slug !== product.slug);
    setCart(newCart);
  }

  function clearCart() {
    setCart([]);
  }

  function getTotalCartValue() {
    const result = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
    return Math.floor(result).toLocaleString();
  }

  function calculateVAT() {
    const cartValue = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    return Math.floor(cartValue * 0.2);
  }

  function getGrandTotal() {
    const cartValue = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    return Math.floor(cartValue + shippingCost);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartValue,
        calculateVAT,
        getGrandTotal,
        shippingCost,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
