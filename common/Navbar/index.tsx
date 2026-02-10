"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { gsap } from "gsap";
import { UserDropdown } from "../UserDropdown";
import { useCurrentUser } from "@/providers/AuthProvider";
import { getUserInitials } from "@/utils/text";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { TestCategoriesDropdown } from "./TestCategoriesDropdown";




const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownTriggerRef = useRef<HTMLDivElement | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { user, appUser } = useCurrentUser();

  // GSAP animations for tests dropdown
  const showDropdown = () => {
    if (dropdownRef.current) {
      // Clear any pending timeouts
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
        dropdownTimeoutRef.current = null;
      }

      setIsDropdownOpen(true);
      gsap.killTweensOf(dropdownRef.current);
      gsap.to(dropdownRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        display: "block",
      });
    }
  };

  const hideDropdown = () => {
    if (dropdownRef.current) {
      // Use a timeout to delay hiding the dropdown
      dropdownTimeoutRef.current = setTimeout(() => {
        gsap.killTweensOf(dropdownRef.current);
        gsap.to(dropdownRef.current, {
          autoAlpha: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (dropdownRef.current) {
              dropdownRef.current.style.display = "none";
              setIsDropdownOpen(false);
            }
          },
        });
      }, 100);
    }
  };

  // Event handlers for mouse interactions
  const handleMouseEnter = () => {
    showDropdown();
  };

  const handleMouseLeave = () => {
    hideDropdown();
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/sign-in");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error("Error logging out: " + error.message);
    }
  };

  // Ensure dropdown is hidden initially
  useEffect(() => {
    if (dropdownRef.current) {
      gsap.set(dropdownRef.current, {
        autoAlpha: 0,
        y: -10,
        display: "none",
      });
    }

    // Cleanup timeouts on unmount
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <header className="bg-emerald-50 py-4 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div>
                <span className="text-emerald-600 font-bold text-xl">
                  BioXLab
                </span>
                <span className="text-gray-600 block text-xs">MEDICAL LABORATORY</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navbar */}
          <nav className="hidden sm:flex flex-wrap justify-center gap-6 text-sm items-center">
            <TestCategoriesDropdown />

            <Link
              href="/about-us"
              className="hover:text-emerald-600 font-medium"
            >
              About Us
            </Link>

            {/* Conditional rendering based on auth state */}
            {!user ? (
              <>
                <Link
                  href="/sign-in"
                  className="hover:text-emerald-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="hover:text-emerald-600 font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <UserDropdown />
            )}
          </nav>

          {/* Mobile Drawer */}
          <div className="flex sm:hidden items-center">
            <Drawer
              direction="right"
              open={openDrawer}
              onOpenChange={setOpenDrawer}
            >
              <DrawerTrigger asChild>
                <button className="text-emerald-600">
                  {openDrawer ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </DrawerTrigger>
              <DrawerContent className="h-full w-[80%] ml-auto shadow-lg flex flex-col p-6">
                <DrawerTitle></DrawerTitle>
                {/* Close Button */}
                <button
                  onClick={() => setOpenDrawer(false)}
                  className="self-end text-gray-500 hover:text-emerald-600"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Mobile User Info */}
                {user && (
                  <div className="flex items-center mb-6 mt-4">
                    <div className="flex items-center justify-center bg-emerald-600 text-white rounded-full h-10 w-10 font-medium">
                      {getUserInitials(appUser?.firstName ?? user.email ?? "")}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {appUser?.firstName && appUser?.lastName
                          ? `${appUser.firstName} ${appUser.lastName}`
                          : user.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Menu Links */}
                <div className="mt-6 space-y-4">
                  <Accordion type="multiple">
                    <AccordionItem value="tests">
                      <AccordionTrigger>Tests</AccordionTrigger>
                      <AccordionContent>
                        {/* Use the same dropdown component for mobile, but with a prop to close drawer on click */}
                        <TestCategoriesDropdown mobile onTestClick={() => setOpenDrawer(false)} />
                      </AccordionContent>
                    </AccordionItem>

                    <Link
                      href="/about-us"
                      onClick={() => setOpenDrawer(false)}
                      className="block text-gray-600 hover:text-emerald-600 py-2"
                    >
                      About Us
                    </Link>

                    {/* Conditional rendering for mobile */}
                    {!user ? (
                      <>
                        <Link
                          href="/sign-in"
                          onClick={() => setOpenDrawer(false)}
                          className="block text-gray-600 hover:text-emerald-600 py-2"
                        >
                          Login
                        </Link>
                        <Link
                          href="/sign-up"
                          onClick={() => setOpenDrawer(false)}
                          className="block text-gray-600 hover:text-emerald-600 py-2"
                        >
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setOpenDrawer(false)}
                          className="block text-gray-600 hover:text-emerald-600 py-2"
                        >
                          Dashboard
                        </Link>

                        <Link
                          href="/profile"
                          onClick={() => setOpenDrawer(false)}
                          className="block text-gray-600 hover:text-emerald-600 py-2"
                        >
                          Profile
                        </Link>

                        <button
                          onClick={async () => {
                            await handleSignOut();
                            setOpenDrawer(false);
                          }}
                          className="block text-gray-600 hover:text-emerald-600 py-2 w-full text-left"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </Accordion>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
