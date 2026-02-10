"use client";
import { excludeNavRoutes } from "@/utils/constants";
import React from "react";
import Navbar from "../common/Navbar";
import { usePathname } from "next/navigation";

const NavbarWrapper = () => {
  const pathname = usePathname();
  return (
    <>
      {excludeNavRoutes.includes(pathname) ? null : (
        <>
          <Navbar />
        </>
      )}
    </>
  );
};

export default NavbarWrapper;
