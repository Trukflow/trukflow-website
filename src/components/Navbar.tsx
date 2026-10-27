import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, ChevronDown, LogOut, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Logo from "@/components/site/Logo";
import { products, SMARTDROP_URL } from "@/components/site/content";
import { cn } from "@/lib/utils";

const productDots: Record<string, string> = {
  smartdrop: "bg-flame-500",
  smartcold: "bg-frost-400",
  chukua: "bg-leaf-400",
};

// Pages that open on a dark, full-bleed hero can start with a transparent bar
const darkHeroRoutes = ["/", "/about", "/smartcold", "/chukua"];

const navLinkClass =
  "relative flex items-center rounded-full px-3.5 py-2.5 text-sm leading-4 text-ink-200 transition-colors hover:bg-white/5 hover:text-white focus:outline-none";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Close the drawer on navigation and lock page scroll while it's open
  useEffect(() => setIsOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const goToProduct = (href: string, external?: boolean) => {
    setIsOpen(false);
    if (external) {
      window.location.href = href;
    } else {
      navigate(href);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("prefillLoginEmail");
    await signOut(auth);
    setIsOpen(false);
    navigate("/company-auth");
  };

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          !darkHeroRoutes.includes(location.pathname)
            ? "border-b border-white/5 bg-ink-950"
            : isScrolled
            ? "border-b border-white/5 bg-ink-950/85 backdrop-blur-xl"
            : "bg-gradient-to-b from-black/60 to-transparent"
        )}
      >
        <div className="site-container relative flex h-[72px] items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0 transition-opacity hover:opacity-80" aria-label="TRUKFLOW home">
            <Logo className="h-14 sm:h-16" />
          </Link>

          {/* Desktop navigation */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-white/10 bg-ink-900/60 p-1 backdrop-blur-md lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(navLinkClass, "gap-1 data-[state=open]:bg-white/5")}>
                Products
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={10}
                className="w-80 rounded-2xl border-ink-700 bg-ink-900/95 p-2 text-ink-200 backdrop-blur-xl"
              >
                {products.map((product) => (
                  <DropdownMenuItem
                    key={product.id}
                    onClick={() => goToProduct(product.href, product.external)}
                    className="cursor-pointer items-start gap-3 rounded-xl p-3 focus:bg-white/5 focus:text-white"
                  >
                    <span className={cn("mt-1.5 h-2 w-2 flex-shrink-0 rounded-full", productDots[product.id])} />
                    <span className="flex-1">
                      <span className="flex items-center gap-2 text-sm font-medium text-white">
                        {product.name}
                        {product.external && <ArrowUpRight className="h-3.5 w-3.5 text-ink-400" />}
                        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-ink-400">
                          {product.status === "pilot" ? "Pilot" : "Soon"}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-ink-300">{product.tagline}</span>
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/hire-drivers" className={navLinkClass}>
              Hire Drivers
            </Link>
            <Link to="/about" className={navLinkClass}>
              About
            </Link>
            <button onClick={() => scrollToSection("faqs")} className={navLinkClass}>
              FAQs
            </button>
            <button onClick={() => scrollToSection("contact")} className={navLinkClass}>
              Contact
            </button>
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="btn-ghost h-10 max-w-[220px] px-4">
                  <span className="truncate">{currentUser.email || "Account"}</span>
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-2xl border-ink-700 bg-ink-900 p-1 text-ink-200">
                  <DropdownMenuItem
                    onClick={() => navigate("/company-auth")}
                    className="cursor-pointer rounded-xl focus:bg-white/5 focus:text-white"
                  >
                    Manage Recruiter Access
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-ink-700" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer rounded-xl text-red-400 focus:bg-red-500/10 focus:text-red-300"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/company-auth" className="btn-pill h-10 px-4 text-ink-200 hover:text-white">
                Recruiter Login
              </Link>
            )}
            <a href={SMARTDROP_URL} className="btn-light h-10">
              Join the pilot
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 text-white transition-colors hover:border-white/30 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-[60] lg:hidden", isOpen ? "pointer-events-auto" : "pointer-events-none")}>
        <div
          onClick={() => setIsOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-[100dvh] w-[min(88vw,24rem)] flex-col border-l border-ink-700 bg-ink-950 text-ink-200 transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-ink-700 px-5">
            <span className="text-sm font-medium text-ink-300">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4">
            <p className="px-3 pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">Products</p>
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => goToProduct(product.href, product.external)}
                className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-white/5"
              >
                <span className={cn("h-2 w-2 rounded-full", productDots[product.id])} />
                <span className="flex-1 text-[15px] text-white">{product.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                  {product.status === "pilot" ? "Pilot" : "Soon"}
                </span>
              </button>
            ))}

            <div className="my-3 border-t border-ink-700" />

            <Link to="/hire-drivers" className="flex min-h-11 items-center rounded-xl px-3 text-[15px] hover:bg-white/5 hover:text-white">
              Hire Drivers
            </Link>
            <Link to="/drivers-job-board" className="flex min-h-11 items-center rounded-xl px-3 text-[15px] hover:bg-white/5 hover:text-white">
              Drivers Job Board
            </Link>
            <Link to="/about" className="flex min-h-11 items-center rounded-xl px-3 text-[15px] hover:bg-white/5 hover:text-white">
              About
            </Link>
            <button
              onClick={() => scrollToSection("faqs")}
              className="flex min-h-11 w-full items-center rounded-xl px-3 text-left text-[15px] hover:bg-white/5 hover:text-white"
            >
              FAQs
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex min-h-11 w-full items-center rounded-xl px-3 text-left text-[15px] hover:bg-white/5 hover:text-white"
            >
              Contact
            </button>
          </div>

          <div className="space-y-2 border-t border-ink-700 p-4">
            {currentUser ? (
              <>
                <Link to="/company-auth" className="btn-ghost w-full">
                  Manage Recruiter Access
                </Link>
                <button onClick={handleLogout} className="btn-pill w-full text-red-400 hover:bg-red-500/10">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/company-auth" className="btn-ghost w-full">
                Recruiter Login
              </Link>
            )}
            <a href={SMARTDROP_URL} className="btn-light w-full">
              Join the Smartdrop pilot
            </a>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
