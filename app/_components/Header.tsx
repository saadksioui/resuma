"use client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-3/4 mx-auto py-5`}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/resuma-logo.svg" alt="Logo" width={150} height={150} />
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <>
            <Link href="#features" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
              How It Works
            </Link>
            {/* <Link href="#testimonials" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
              Testimonials
            </Link> */}
            <Link href="#pricing" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
              Pricing
            </Link>
          </>
          <>
            {
              user ? (
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
                  Dashboard
                </Link>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
                    <Button variant={"outline"}>Sign In</Button>
                  </Link>
                  <Link href="/sign-up" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
                    <Button>Get Started</Button>
                  </Link>
                </div>
              )
            }
          </>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 bg-white shadow-md py-4 md:hidden">
            <div className="container w-3/4 mx-auto flex flex-col space-y-4">

              <>
                <Link
                  href="#features"
                  className="text-gray-700 hover:text-blue-500 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-gray-700 hover:text-blue-500 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                {/* <Link
                  href="#testimonials"
                  className="text-gray-700 hover:text-blue-500 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </Link> */}
                <Link
                  href="#pricing"
                  className="text-gray-700 hover:text-blue-500 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
              </>
              <>
                {
                  user ? (
                    <Link href="/dashboard" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
                      Dashboard
                    </Link>
                  ) : (
                    <div className="flex flex-row space md:flex-col md:space-y-4">
                      <Link href="/login" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
                        <Button variant={"outline"}>Sign In</Button>
                      </Link>
                      <Link href="/sign-up" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
                        <Button>Get Started</Button>
                      </Link>
                    </div>
                  )
                }
              </>
            </div>
          </div>
        )}
      </div>
    </header>
  )
};

export default Header
