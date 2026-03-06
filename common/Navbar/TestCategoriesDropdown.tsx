"use client";

import { ChevronDown, ChevronRight, Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GroupedTestCategory, Test } from "./types";
import {
  fetchPopularTests,
  fetchTests,
} from "@/utils/data/tests";

export const TestCategoriesDropdown = ({
  mobile = false,
  onTestClick,
}: {
  mobile?: boolean;
  onTestClick?: () => void;
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Replace with Supabase fetch in useEffect if needed
  const [testCategories, setTestCategories] = useState<GroupedTestCategory[]>(
    []
  );

  // Animate dropdown (desktop only)
  useEffect(() => {
    if (!mobile && dropdownRef.current) {
      gsap.set(dropdownRef.current, {
        autoAlpha: 0,
        y: -10,
        display: "none",
      });
    }
  }, [mobile]);

  useEffect(() => {
    if (!mobile && dropdownRef.current) {
      if (isDropdownOpen) {
        gsap.killTweensOf(dropdownRef.current);
        gsap.set(dropdownRef.current, {
          display: "block",
          pointerEvents: "auto", // ✅ Enable pointer events
        });
        gsap.to(dropdownRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.killTweensOf(dropdownRef.current);
        gsap.to(dropdownRef.current, {
          autoAlpha: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (dropdownRef.current) {
              dropdownRef.current.style.display = "none";
              dropdownRef.current.style.pointerEvents = "none"; // ✅ Disable to block ghost clicks
            }
          },
        });
      }
    }
  }, [isDropdownOpen, mobile]);

  // Hide dropdown on click outside (desktop only)
  useEffect(() => {
    if (mobile) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, mobile]);

  useEffect(() => {
    const fetchTestsData = async () => {
      try {
        const data = await fetchTests();

        // Type assertion to help TS understand the shape
        const typedData = data as Test[];

        const grouped = typedData.reduce<
          Record<string, { id: string; name: string }[]>
        >((acc, curr) => {
          const categoryName = curr.test_category?.name || "Uncategorized";
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push({ id: curr.id, name: curr.name });
          return acc;
        }, {});

        const formatted: GroupedTestCategory[] = Object.entries(grouped).map(
          ([category, tests]) => ({
            category,
            tests,
          })
        );

        setTestCategories(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setLoading(false);
      }
    };

    fetchTestsData();
  }, []);

  // Mobile: always open, no button.
  if (mobile) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {testCategories.map((category, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-semibold text-emerald-700 border-b border-gray-100 pb-1 mb-2">
              {category.category}
            </p>
            <ul className="mt-1 space-y-2">
              {category.tests.map((test) => (
                <li key={test.id}>
                  <Link
                    href={`/tests/${test.id}`}
                    className="block text-gray-600 hover:text-emerald-600 hover:translate-x-1 text-sm py-1 cursor-pointer transition-all duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {test.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center gap-1 hover:text-emerald-600 font-medium transition-colors duration-200"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        type="button"
      >
        Tests{" "}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={dropdownRef}
        className="absolute -right-40 top-8 bg-white shadow-lg rounded-md mt-2 py-6 px-6 w-[600px] z-40 border border-gray-100"
      >
        {loading && (
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center py-12">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}

        {!loading && (
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-3 gap-8 w-full">
              {testCategories.slice(0, 3).map((category, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-semibold text-emerald-700 border-b border-gray-100 pb-1 mb-2">
                    {category.category}
                  </p>
                  <ul className="space-y-2">
                    {category.tests.map((test, index) => (
                      <li key={index}>
                        <Link
                          href={`/tests/${test.id}`}
                          className="block text-gray-600 hover:text-emerald-600 hover:translate-x-1 text-sm py-1 cursor-pointer transition-all duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {test.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div
              className="ml-6 mt-2 border-l pl-6 h-full"
              onClick={() => setIsDropdownOpen(false)}
            >
              <Link
                href="/tests"
                className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm whitespace-nowrap transition-colors duration-200"
              >
                View All Tests <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
