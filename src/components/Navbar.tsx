
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (path: string) => {
    if (window.location.pathname === '/' && path.startsWith('#')) {
      scrollToSection(path.substring(1));
    } else if (path.startsWith('#')) {
      window.location.href = '/' + path;
    } else {
      window.location.href = path;
    }
  };

  const handleLogoClick = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Skeleton className="h-16 w-24" />
            <div className="hidden md:flex items-center space-x-8">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg' 
        : 'bg-white border-b border-gray-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Increased Size */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className={`cursor-pointer transition-colors duration-200 ${
                isScrolled ? 'hover:opacity-80' : 'hover:opacity-90'
              }`}
            >
              <img 
                src="/TRUK Logo3.png" 
                alt="TRUK Logo"
                className="h-16 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center transition-colors duration-200 font-medium focus:outline-none focus:ring-0 focus:border-none ${
                isScrolled ? 'text-white hover:text-red-500' : 'text-gray-700 hover:text-red-500'
              }`}>
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => window.location.href = '/agritruk'}
                >
                  agriTRUK
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => window.location.href = '/cargotruk'}
                >
                  cargoTRUK
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => window.location.href = '/driver-enlistment'}
                >
                  Driver enlistment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Other Navigation Items */}
            <button
              onClick={() => handleNavigation('/about')}
              className={`transition-colors duration-200 font-medium ${
                isScrolled ? 'text-white hover:text-red-500' : 'text-gray-700 hover:text-red-500'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation('#faqs')}
              className={`transition-colors duration-200 font-medium ${
                isScrolled ? 'text-white hover:text-red-500' : 'text-gray-700 hover:text-red-500'
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => handleNavigation('#contact')}
              className={`transition-colors duration-200 font-medium ${
                isScrolled ? 'text-white hover:text-red-500' : 'text-gray-700 hover:text-red-500'
              }`}
            >
              Contact Us
            </button>

            {/* Get Started Button - Fixed to be black */}
            <Button 
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white transition-all duration-200 font-medium px-6 rounded-full transform hover:scale-105"
              onClick={() => window.location.href = '/download'}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors duration-200 ${
                isScrolled ? 'text-white hover:text-gray-200' : 'text-gray-700 hover:text-gray-900'
              }`}
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
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="block px-3 py-2 text-gray-700 font-medium">
                Services
              </div>
              <div className="pl-6 space-y-1">
                <button 
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-left w-full"
                  onClick={() => window.location.href = '/agritruk'}
                >
                  agriTRUK
                </button>
                <button 
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-left w-full"
                  onClick={() => window.location.href = '/cargotruk'}
                >
                  cargoTRUK
                </button>
                <button 
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-left w-full"
                  onClick={() => window.location.href = '/driver-enlistment'}
                >
                  Driver enlistment
                </button>
              </div>
              <button
                onClick={() => handleNavigation('/about')}
                className="block px-3 py-2 text-gray-700 font-medium hover:text-gray-900 text-left w-full"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigation('#faqs')}
                className="block px-3 py-2 text-gray-700 font-medium hover:text-gray-900 text-left w-full"
              >
                FAQs
              </button>
              <button
                onClick={() => handleNavigation('#contact')}
                className="block px-3 py-2 text-gray-700 font-medium hover:text-gray-900 text-left w-full"
              >
                Contact Us
              </button>
              <div className="px-3 py-2">
              <button
                className="
                  w-full 
                  bg-gray-900  // Deeper black than 'bg-black'
                  hover:bg-gradient-to-r hover:from-green-800 hover:to-green-900
                  text-white 
                  font-medium 
                  rounded-full
                  transition-colors duration-300  // Smoother for color changes
                  hover:shadow-lg hover:shadow-green-400/30
                  transform hover:scale-[1.02]
                  active:scale-100  // Optional: Add a click effect
                "
                onClick={() => window.location.href = '/download'}
              >
                Get Started
              </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
