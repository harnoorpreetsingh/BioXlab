"use client";
import { excludeNavRoutes } from "@/utils/constants";
import React from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/home/Footer";

const FooterWrapper = () => {
  const pathname = usePathname();
  return (
    <>
      {excludeNavRoutes.includes(pathname) ? null : (
        <>
          <Footer />
        </>
      )}
    </>
  );
};

export default FooterWrapper;
