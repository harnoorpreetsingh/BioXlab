import { Clock, Facebook, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Topbar = () => {
  return (
    <>
      <div className="bg-emerald-800 text-white py-2 px-4 md:px-8 text-xs md:text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              <span>losalamos-admin@yopmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Working Hours - Mon - Fri 9:30 - 18:30</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-3 w-3" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-3 w-3" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
