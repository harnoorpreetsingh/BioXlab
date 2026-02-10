import { ArrowRight, Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer className="bg-white pt-16 pb-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center mb-4">
                {/* <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="LosAlamos Laboratory Logo"
                  width={50}
                  height={50}
                  className="mr-2"
                /> */}
                <div>
                  <span className="text-emerald-600 font-bold text-xl">
                    BioXLab
                  </span>
                  <span className="text-gray-600 block text-xs">
                    MEDICAL LABORATORY
                  </span>
                </div>
              </Link>
              <p className="text-gray-600 text-sm mb-4">
                We are provide the perfect solution for all kind of laboratories
                & laboratory based management websites. A complete package for
                the best online lab services.
              </p>
              <p className="font-bold mb-2">Follow Us:</p>
              <div className="flex space-x-3">
                <Link href="#" className="text-gray-400 hover:text-emerald-600">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-emerald-600">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-emerald-600">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Usefull Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about-us"
                    className="text-gray-600 hover:text-emerald-600 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-600 hover:text-emerald-600 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-gray-600 hover:text-emerald-600 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-emerald-600 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/research"
                    className="text-gray-600 hover:text-emerald-600 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> Research
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Recent Post</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Image
                    src="https://images.pexels.com/photos/7722953/pexels-photo-7722953.jpeg"
                    alt="Blog post"
                    width={60}
                    height={60}
                    className="rounded"
                    style={{
                      height: "60px",
                      width: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p className="text-xs text-gray-500">Feb 05, 2020</p>
                    <Link
                      href="#"
                      className="text-sm font-medium hover:text-emerald-600"
                    >
                      Tests with Nursing Implicit Laboratory Technician
                    </Link>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Image
                    src="https://images.pexels.com/photos/3735733/pexels-photo-3735733.jpeg"
                    alt="Blog post"
                    width={60}
                    height={60}
                    className="rounded"
                    style={{
                      height: "60px",
                      width: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p className="text-xs text-gray-500">Feb 05, 2020</p>
                    <Link
                      href="#"
                      className="text-sm font-medium hover:text-emerald-600"
                    >
                      Equipping Researchers Lab in the Developing
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-600 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> Scientific
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-600 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> Chemistry
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-600 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> Gemological
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-600 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> Forensic science
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-600 flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" /> Immunology
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-gray-600">
          <p>Copyright © 2025 BioXLab. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
