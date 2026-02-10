"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/providers/CartProvider";

type CartButtonProps = {
  onClick: () => void;
};

export function CartButton({ onClick }: CartButtonProps) {
  const { getItemCount } = useCart();
  const [itemCount, setItemCount] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const count = getItemCount();

    if (count > itemCount) {
      setAnimating(true);

      // Animate the cart button when items are added
      const timeline = gsap.timeline();
      timeline.to(".cart-button", {
        scale: 1.2,
        duration: 0.2,
        ease: "power1.inOut",
      });
      timeline.to(".cart-button", {
        scale: 1,
        duration: 0.2,
        ease: "power1.inOut",
        onComplete: () => setAnimating(false),
      });
    }

    setItemCount(count);
  }, [getItemCount, itemCount]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="cart-button relative bg-white border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
      onClick={onClick}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge
          className={`absolute -top-2 -right-2 bg-teal-600 hover:bg-teal-600 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full ${animating ? "animate-bounce" : ""}`}
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
}
