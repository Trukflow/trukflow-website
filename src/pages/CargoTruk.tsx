
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const CargoTruk = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll and animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton type="hero" />;
  }

  return (
    <div className="min-h-screen">
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(2rem);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }
          .animate-fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}
      </style>

      <Navbar />
      
      {/* Hero Section with Background */}
      <section className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop"
            alt="Cargo background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 via-blue-800/75 to-blue-800/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center relative z-20">
          <div className="w-full text-center text-white">
            <div className="animate-on-scroll">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-red-500">cargo</span>TRUK
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto">
                Reliable freight and cargo transportation services for businesses across East Africa
              </p>
              <Button 
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 md:px-16 py-4 md:py-6 rounded-full text-xl md:text-2xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => window.location.href = '/download'}
              >
                Ship Your Cargo Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 text-center mb-12 md:mb-16 animate-on-scroll">
            Why Choose cargoTRUK?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center animate-on-scroll bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📦</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Secure Handling</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Your cargo is handled with utmost care using professional loading equipment and secure packaging methods.
              </p>
            </div>
            <div className="text-center animate-on-scroll bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Insurance Coverage</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Full insurance coverage for your shipments ensuring peace of mind during transportation.
              </p>
            </div>
            <div className="text-center animate-on-scroll md:col-span-2 lg:col-span-1 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Regional Network</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Extensive network covering major cities and towns across East Africa for seamless cargo movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 text-center mb-12 md:mb-16 animate-on-scroll">
            How it works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center animate-on-scroll bg-white p-6 rounded-lg shadow-lg">
              <div className="w-full h-48 md:h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
                  alt="Request Transport"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Request Transport</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Submit your cargo transport request through our platform with detailed information about your shipment.
              </p>
            </div>
            <div className="text-center animate-on-scroll bg-white p-6 rounded-lg shadow-lg">
              <div className="w-full h-48 md:h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
                  alt="Match with Transporters"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Match with Transporters</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Our smart system connects you with verified transporters who specialize in cargo shipping.
              </p>
            </div>
            <div className="text-center animate-on-scroll md:col-span-2 lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
              <div className="w-full h-48 md:h-64 bg-gradient-to-br from-red-100 to-red-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
                  alt="Track & Deliver"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Track & Deliver</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Monitor your shipment in real-time and receive updates until safe delivery to your destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Scale Your Business with Reliable Cargo Solutions
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              Join businesses across East Africa using cargoTRUK for their logistics needs
            </p>
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 md:px-12 py-4 rounded-full text-lg md:text-xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => window.location.href = '/download'}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CargoTruk;
