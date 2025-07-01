import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const DriverEnlistment = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for initial render
  useEffect(() => {
    console.log('Starting loading timer');
    const timer = setTimeout(() => {
      console.log('Loading complete');
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    console.log('Rendering LoadingSkeleton');
    return <LoadingSkeleton type="hero" />;
  }

  return (
    <div className="min-h-screen">
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          /* Ensure content is visible without animation */
          .section-content {
            opacity: 1;
            transform: translateY(0);
          }
          .image-fallback {
            background-color: #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4b5563;
            font-size: 1rem;
            text-align: center;
          }
        `}
      </style>

      <Navbar />

      {/* Hero Section with Background */}
      <section className="min-h-screen  relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/DriverEnlImage1.jpg"
            alt="Driver background"
            className="w-full h-full object-cover"
            onLoad={() => console.log('Hero image loaded')}
            onError={() => console.log('Hero image failed to load')}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-800/90 via-orange-800/75 to-red-800/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center relative z-10">
          <div className="w-full text-center text-white section-content">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Driver <span className="text-red-500">Enlistment</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto">
              Join our network of professional drivers and earn more with verified bookings
            </p>
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 md:px-16 py-4 md:py-6 rounded-full text-xl md:text-2xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                console.log('Join as a Driver button clicked');
                window.location.href = '/download';
              }}
            >
              Join as a Driver
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-content">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 text-center mb-12 md:mb-16">
            Why Drive with TRUK?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Earn 25% More</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Increase your earnings with our verified booking system and premium route assignments.
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Easy App Management</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Manage your bookings, track earnings, and communicate with clients through our user-friendly app.
              </p>
            </div>
            <div className="text-center md:col-span-2 lg:col-span-1 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Support Network</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Access to 24/7 support, training programs, and a community of professional drivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-content">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 text-center mb-12 md:mb-16">
            Driver Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Basic Requirements</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-600">Valid driver's license (minimum 2 years)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-600">Age 21 or older</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-600">Clean driving record</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-600">Vehicle registration and insurance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-600">Smartphone with internet access</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Vehicle Requirements</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-600">Commercial vehicle (truck/van)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-600">Vehicle model 2010 or newer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-600">Regular maintenance records</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-600">Commercial insurance coverage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-600">Vehicle inspection certificate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden z-10" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 section-content">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 text-center mb-12 md:mb-16">
            How it works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
              <div className="w-full h-48 md:h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
                  alt="Sign Up"
                  className="w-full h-full object-cover"
                  onLoad={() => console.log('How It Works image 1 loaded')}
                  onError={() => console.log('How It Works image 1 failed to load')}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Sign Up</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Create your driver profile and complete verification to join our trusted network.
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
              <div className="w-full h-48 md:h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
                  alt="Accept Bookings"
                  className="w-full h-full object-cover"
                  onLoad={() => console.log('How It Works image 2 loaded')}
                  onError={() => console.log('How It Works image 2 failed to load')}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Accept Bookings</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Receive verified booking requests that match your location and vehicle type.
              </p>
            </div>
            <div className="text-center md:col-span-2 lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
              <div className="w-full h-48 md:h-64 bg-gradient-to-br from-red-100 to-red-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
                  alt="Earn More"
                  className="w-full h-full object-cover"
                  onLoad={() => console.log('How It Works image 3 loaded')}
                  onError={() => console.log('How It Works image 3 failed to load')}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Earn More</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Complete deliveries and earn up to 25% more than traditional transport services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-800 via-orange-700 to-red-800 text-white relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center section-content">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Drive Your Success?
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Join thousands of drivers earning more with TRUK
          </p>
          <Button 
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 md:px-12 py-4 rounded-full text-lg md:text-xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={() => {
              console.log('Start Driving Today button clicked');
              window.location.href = '/download';
            }}
          >
            Start Driving Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DriverEnlistment;