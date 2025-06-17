import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-gray-900">
              TRUK
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md border border-white/20 shadow-lg">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100/50">
                  agriTRUK
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100/50">
                  cargoTRUK
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Other Navigation Items */}
            <a
              href="#about"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              About Us
            </a>
            <a
              href="#faqs"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              FAQs
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Contact Us
            </a>

            {/* Get Started Button */}
            <Button className="bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-medium px-6 rounded-full">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="block px-3 py-2 text-gray-700 font-medium">
                Services
              </div>
              <div className="pl-6 space-y-1">
                <a
                  href="#agritruk"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  agriTRUK
                </a>
                <a
                  href="#cargotruk"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  cargoTRUK
                </a>
              </div>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-700 font-medium hover:text-gray-900"
              >
                About Us
              </a>
              <a
                href="#faqs"
                className="block px-3 py-2 text-gray-700 font-medium hover:text-gray-900"
              >
                FAQs
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-700 font-medium hover:text-gray-900"
              >
                Contact Us
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200 font-medium rounded-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
