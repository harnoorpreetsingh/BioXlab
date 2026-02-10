"use client";

import { use, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ArrowLeft, Clock, FileText, Plus, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fetchTestById } from "@/utils/data/tests";
import type { Test } from "@/types";
import { useCart } from "@/providers/CartProvider";
import { useRouter } from "next/navigation";

export default function TestDetailsPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const router = useRouter();

 const { testId } = use(params);
  const { addItem, isInCart } = useCart();
  const [test, setTest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTest() {
      setLoading(true);
      const fetchedTest = await fetchTestById(testId);
      if (fetchedTest) {
        setTest(fetchedTest);
      } else {
        setTest(null);
      }
      setLoading(false);

      // Animations
      const timeline = gsap.timeline({ delay: 0.2 });
      timeline.fromTo(
        ".page-header",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
      timeline.fromTo(
        ".test-details",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );
      timeline.fromTo(
        ".test-actions",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );
    }
    fetchTest();
  }, [testId]);

  const handleAddToCart = () => {
    if (test) {
      addItem(test);

      // Animate the button
      gsap.to(".add-to-cart-btn", {
        scale: 1.1,
        duration: 0.2,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(".add-to-cart-btn", {
            scale: 1,
            duration: 0.2,
            ease: "power1.inOut",
          });
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }


  if (!test) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800">
            Test not found
          </h2>
          <p className="mt-2 text-gray-500">
            The test you're looking for doesn't exist or has been removed.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/tests")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tests
          </Button>
        </div>
      </div>
    );
  }

  const isTestInCart = isInCart(test.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="page-header mb-6 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => router.push("/tests")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tests
        </Button>
        <div className="w-1 h-6 bg-teal-600 mr-3"></div>
        <h1 className="text-2xl font-semibold text-gray-800">Test Details</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="test-details border-gray-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {test.name}
                </h2>
                {test.popular && (
                  <Badge
                    variant="outline"
                    className="bg-teal-50 text-teal-700 border-teal-200"
                  >
                    Popular
                  </Badge>
                )}
              </div>

              <p className="text-gray-600 mb-6">{test.description}</p>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">
                    Test Information
                  </h3>

                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Category</p>
                      <p className="text-gray-600 capitalize">
                        {test.test_category.name}
                      </p>
                    </div>
                  </div>

                  {test.preparation && (
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-teal-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Preparation</p>
                        <p className="text-gray-600">{test.preparation}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Timing</h3>

                  {test.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-teal-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Test Duration</p>
                        <p className="text-gray-600">{test.duration}</p>
                      </div>
                    </div>
                  )}

                  {test.report_time && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-teal-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Report Time</p>
                        <p className="text-gray-600">{test.report_time}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="test-actions border-gray-200 sticky top-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Pricing</h3>

              <div className="mb-6">
                <p className="text-3xl font-bold text-teal-600">
                  ${test.cost}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Inclusive of all taxes
                </p>
              </div>

              <Button
                className={`add-to-cart-btn w-full ${isTestInCart ? "bg-teal-400" : "bg-teal-600"} hover:bg-teal-700 text-white`}
                onClick={handleAddToCart}
                disabled={isTestInCart}
              >
                {isTestInCart ? (
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

              <div className="mt-6 text-sm text-gray-500">
                <p>• Sample collection available at lab or home</p>
                <p>• Digital reports available</p>
                <p>
                  • Results typically available in{" "}
                  {test.report_time || "1-2 days"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
