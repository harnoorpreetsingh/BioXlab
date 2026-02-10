"use client";

import { useEffect, useState } from "react";
import { CartButton } from "./CartButton";
import { CartModal } from "./CartModal";
import { useSearchParams } from "next/navigation";

export function CartContainer() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isLogin = useSearchParams().get("login");

  useEffect(() => {
    if (isLogin === "true") {
      setIsCartOpen(true);
    } else {
      setIsCartOpen(false);
    }
  }, [isLogin]);
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <CartButton onClick={() => setIsCartOpen(true)} />
      </div>
      <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
