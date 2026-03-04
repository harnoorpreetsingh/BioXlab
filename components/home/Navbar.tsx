"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, TestTube2, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md shadow-md border-b border-slate-800 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
              <TestTube2 className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white transition-colors">
              BioX<span className="text-emerald-500">Lab</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link href="/book">
              <Button
                className={cn(
                  "rounded-full px-6 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300",
                  isScrolled ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-emerald-500 text-white hover:bg-emerald-600"
                )}
              >
                Book a Test
              </Button>
            </Link>

            {session ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-transparent">
                    <Avatar className="h-10 w-10 border-2 border-emerald-500/50 transition-all duration-300 hover:border-emerald-400">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                      <AvatarFallback className="bg-emerald-950 text-emerald-400 font-semibold">
                        {session.user?.name
                          ? session.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 bg-slate-900/90 backdrop-blur-xl border-slate-700 text-slate-100 shadow-2xl p-2"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal px-3 py-3">
                    <div className="flex flex-col space-y-1.5">
                      <p className="text-sm font-semibold leading-none text-white">{session.user?.name}</p>
                      <p className="text-xs leading-none text-slate-400 font-mono">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700/50 my-2" />
                  <Link href="/dashboard" className="w-full">
                    <DropdownMenuItem
                      className="text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 focus:bg-slate-800/50 focus:text-emerald-400 cursor-pointer px-3 py-2.5 rounded-md transition-colors"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="bg-slate-700/50 my-2" />
                  <DropdownMenuItem
                    className="text-red-400 hover:text-red-300 hover:bg-red-950/30 focus:bg-red-950/30 focus:text-red-300 cursor-pointer px-3 py-2.5 rounded-md transition-colors"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">
                <Button
                  className={cn(
                    "rounded-full px-6 shadow-lg transition-all duration-300",
                    isScrolled
                      ? "bg-slate-800 hover:bg-slate-700 text-white"
                      : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
                  )}
                >
                  Login / Sign Up
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="container px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 font-medium py-2 hover:text-emerald-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/book" className="w-full">
                <Button className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4">
                  Book a Test
                </Button>
              </Link>

              {session ? (
                <div className="flex flex-col gap-2 mt-4 border-t pt-4">
                  <div className="flex items-center gap-3 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback>
                        {session.user?.name
                          ? session.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{session.user?.name}</span>
                      <span className="text-xs text-muted-foreground">{session.user?.email}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link href="/sign-in" className="w-full">
                  <Button className="w-full rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 mt-2">
                    Login / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav >
  );
};

export default Navbar;
