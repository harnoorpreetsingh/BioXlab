"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Clock, FileText, Plus, ShoppingCart } from "lucide-react";

import type { Test } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/providers/CartProvider";

type TestCardProps = {
  test: Test;
  variant?: "default" | "compact";
};

export function TestCard({ test, variant = "default" }: TestCardProps) {
  const { addItem, isInCart } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const alreadyInCart = isInCart(test.id);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const handleAddToCart = () => {
    addItem(test);

    // Animate the button
    if (cardRef.current) {
      const button = cardRef.current.querySelector(".add-to-cart-btn");
      if (button) {
        gsap.to(button, {
          scale: 1.1,
          duration: 0.2,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(button, {
              scale: 1,
              duration: 0.2,
              ease: "power1.inOut",
            });
          },
        });
      }
    }
  };

  if (variant === "compact") {
    return (
      <Card
        ref={cardRef}
        className="h-full border-gray-200 hover:border-teal-300 transition-colors"
      >
        <CardHeader className="p-4">
          <CardTitle className="text-base">{test.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-gray-500 line-clamp-2">
            {test.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="font-medium text-teal-600">${test.cost  }</p>
          <Button
            size="sm"
            className={`add-to-cart-btn ${alreadyInCart ? "bg-teal-700" : "bg-teal-600"} hover:bg-teal-700 text-white`}
            onClick={handleAddToCart}
          >
            {alreadyInCart ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      ref={cardRef}
      className="h-full border-gray-200 hover:border-teal-300 transition-colors"
    >
      <CardHeader className="p-6">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{test.name}</CardTitle>
          {test.popular && (
            <Badge
              variant="outline"
              className="bg-teal-50 text-teal-700 border-teal-200"
            >
              Popular
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-gray-500 mb-4">{test.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {test.preparation && (
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-teal-600 mt-0.5" />
              <div>
                <p className="font-medium">Preparation</p>
                <p className="text-gray-500">{test.preparation}</p>
              </div>
            </div>
          )}

          {test.report_time && (
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-teal-600 mt-0.5" />
              <div>
                <p className="font-medium">Report Time</p>
                <p className="text-gray-500">{test.report_time}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="font-medium text-lg text-teal-600">
            ${test.cost}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-initial" asChild>
            <Link href={`/tests/${test.id}`}>View Details</Link>
          </Button>
          <Button
            className={`add-to-cart-btn flex-1 sm:flex-initial ${alreadyInCart ? "bg-teal-400" : "bg-teal-600"} hover:bg-teal-700 text-white`}
            onClick={handleAddToCart}
            disabled={alreadyInCart}
          >
            {alreadyInCart ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Added to Cart
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
