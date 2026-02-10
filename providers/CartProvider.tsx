"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { CartItem, Test } from "@/types";

type CartContextType = {
  items: CartItem[];
  addItem: (test: Test) => void;
  removeItem: (testId: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  isInCart: (testId: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
        }
      }
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (test: Test) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.test.id === test.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.test.id === test.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { test, quantity: 1 }];
      }
    });
  };

  const removeItem = (testId: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.test.id === testId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.test.id === testId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevItems.filter((item) => item.test.id !== testId);
      }
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + Number(item.test.cost) * item.quantity,
      0
    );
  };

  const isInCart = (testId: string) => {
    return items.some((item) => item.test.id === testId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        getItemCount,
        getTotalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
