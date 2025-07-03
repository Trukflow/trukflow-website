import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [isOverWhiteSection, setIsOverWhiteSection] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      console.log("Navbar loading complete");
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Check if navbar is over a white background section
      const sections = document.querySelectorAll("section");
      const navbarHeight = 80; // Approximate navbar height

      let overWhite = false;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;

        if (sectionTop <= navbarHeight && sectionBottom >= 0) {
          const computedStyle = window.getComputedStyle(section);
          const bgColor = computedStyle.backgroundColor;
          const bgImage = computedStyle.backgroundImage;

          if (
            bgColor === "rgb(255, 255, 255)" ||
            bgColor === "white" ||
            bgColor.includes("248, 250, 252") ||
            bgColor.includes("249, 250, 251") ||
            bgColor.includes("250, 250, 250") ||
            bgColor.includes("248, 248, 248") ||
            section.classList.contains("bg-white") ||
            section.classList.contains("bg-gray-50") ||
            section.classList.contains("from-white") ||
            section.classList.contains("to-gray-50") ||
            section.classList.contains("from-gray-50") ||
            section.classList.contains("to-white") ||
            (bgImage === "none" && (bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent"))
          ) {
            overWhite = true;
          }
        }
      });

      setIsOverWhiteSection(overWhite);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    console.log(`Attempting to navigate to section: ${sectionId}`);
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        console.log(`Scrolling to section ${sectionId} on current page`);
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log(`Section ${sectionId} not found on /, navigating to /#${sectionId}`);
        navigate(`/#${sectionId}`);
      }
    } else {
      console.log(`Not on /, navigating to /#${sectionId}`);
      navigate(`/#${sectionId}`);
    }
  };

  const getTextColor = () => {
    if (isScrolled) {
      return isOverWhiteSection ? "text-red-500" : "text-white";
    }
    return isOverWhiteSection ? "text-red-500" : "text-gray-700";
  };

  const getHoverColor = () => {
    if (isScrolled) {
      return isOverWhiteSection ? "hover:text-red-600" : "hover:text-red-500";
    }
    return isOverWhiteSection ? "hover:text-red-600" : "hover:text-red-500";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-white/20 shadow-lg"
          : "bg-white border-b border-gray-200 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                console.log("Navigating to /");
                navigate("/");
              }}
              className={`cursor-pointer transition-colors duration-200 ${
                isScrolled ? "hover:opacity-80" : "hover:opacity-90"
              }`}
            >
              <img src="/TRUK Logo3.png" alt="TRUK Logo" className="h-12 sm:h-16 w-auto" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center transition-colors duration-200 font-medium focus:outline-none focus:ring-0 focus:border-none ${getTextColor()} ${getHoverColor()}`}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    console.log("Navigating to /agritruk");
                    navigate("/agritruk");
                  }}
                >
                  agriTRUK
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    console.log("Navigating to /cargotruk");
                    navigate("/cargotruk");
                  }}
                >
                  cargoTRUK
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    console.log("Navigating to /driver-enlistment");
                    navigate("/driver-enlistment");
                  }}
                >
                  Driver enlistment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Other Navigation Items */}
            <button
              onClick={() => {
                console.log("Navigating to /about");
                navigate("/about");
              }}
              className={`transition-colors duration-200 font-medium ${getTextColor()} ${getHoverColor()}`}
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("faqs")}
              className={`transition-colors duration-200 font-medium ${getTextColor()} ${getHoverColor()}`}
            >
              FAQs
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`transition-colors duration-200 font-medium ${getTextColor()} ${getHoverColor()}`}
            >
              Contact Us
            </button>

            {/* Get Started Button */}
            <Button
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white transition-all duration-300 font-medium px-6 rounded-full transform hover:scale-105 shadow-2xl hover:shadow-gray-500/30"
              onClick={() => {
                console.log("Navigating to /download");
                navigate("/download");
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors duration-200 p-2 ${
                isScrolled
                  ? isOverWhiteSection
                    ? "text-red-500 hover:text-red-600"
                    : "text-white hover:text-gray-200"
                  : isOverWhiteSection
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-40">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="block px-3 py-2 text-gray-700 font-medium">Services</div>
              <div className="pl-6 space-y-1">
                <button
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-left w-full"
                  onClick={() => {
                    console.log("Navigating to /agritruk");
                    setIsOpen(false);
                    navigate("/agritruk");
                  }}
                >
                  agriTRUK
                </button>
                <button
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-left w-full"
                  onClick={() => {
                    console.log("Navigating to /cargotruk");
                    setIsOpen(false);
                    navigate("/cargotruk");
                  }}
                >
                  cargoTRUK
                </button>
                <button
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-left w-full"
                  onClick={() => {
                    console.log("Navigating to /driver-enlistment");
                    setIsOpen(false);
                    navigate("/driver-enlistment");
                  }}
                >
                  Driver enlistment
                </button>
              </div>
              <button
                onClick={() => {
                  console.log("Navigating to /about");
                  setIsOpen(false);
                  navigate("/about");
                }}
                className="block px-3 py-2 text-gray-700 font-medium hover:text-gray-900 text-left w-full"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  console.log("Navigating to /#faqs");
                  setIsOpen(false);
                  scrollToSection("faqs");
                }}
                className="block px-3 py-2 text-gray-700 font-medium hover:text-gray-900 text-left w-full"
              >
                FAQs
              </button>
              <button
                onClick={() => {
                  console.log("Navigating to /#contact");
                  setIsOpen(false);
                  scrollToSection("contact");
                }}
                className="block px-3 py-2 text-gray-700 font-medium hover:text-gray-900 text-left w-full"
              >
                Contact Us
              </button>
              <div className="px-3 py-2">
                <button
                  className="
                    w-full 
                    bg-gray-900
                    hover:bg-gradient-to-r hover:from-green-800 hover:to-green-900
                    text-white 
                    font-medium 
                    rounded-full
                    py-2
                    transition-all duration-300
                    shadow-2xl hover:shadow-green-400/30
                    transform hover:scale-[1.02]
                    active:scale-100
                  "
                  onClick={() => {
                    console.log("Navigating to /download");
                    setIsOpen(false);
                    navigate("/download");
                  }}
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
