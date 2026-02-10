"use client";
import { excludeNavRoutes } from "@/utils/constants";
import React from "react";
import { usePathname } from "next/navigation";
import Topbar from "@/common/Topbar";

const TopbarWrapper = () => {
  const pathname = usePathname();
  return (
    <>
      {excludeNavRoutes.includes(pathname) ? null : (
        <>
          <Topbar />
        </>
      )}
    </>
  );
};

export default TopbarWrapper;
