import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { ArrowDown } from "lucide-react";

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
      <section className="min-h-screen bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/DriverEnlImage1.jpg"
            alt="Driver background"
            className="w-full h-full object-cover"
            onLoad={() => console.log('Hero image loaded')}
            onError={() => console.log('Hero image failed to load')}
          />
          <div className="absolute inset-0 bg-gray-900/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center relative z-10">
          <div className="w-full text-center text-white section-content">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Join Our <span className="text-red-500">Driver</span> Network
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto">
              Become a verified transporter and earn 25% more on every booking with TRUK
            </p>
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 md:px-16 py-4 md:py-6 rounded-full text-xl md:text-2xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                console.log('Start Earning Today button clicked');
                window.location.href = '/download';
              }}
            >
              Start Earning Today
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
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Higher Earnings</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Earn up to 25% more than traditional transport services with our verified booking system and premium rates.
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Easy Booking</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Get bookings directly through our app with transparent pricing and secure payment processing.
              </p>
            </div>
            <div className="text-center md:col-span-2 lg:col-span-1 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Full Support</h3>
              <p className="text-gray-600 text-sm md:text-base">
                24/7 customer support, insurance coverage, and dedicated driver assistance for all your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements and How to Join Section - Side by Side */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-content">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Requirements Section - Left Side */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-12">
                Requirements
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Requirements</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Valid vehicle registration</li>
                      <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Comprehensive insurance</li>
                      <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Regular maintenance records</li>
                      <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Good vehicle condition</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Driver Requirements</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Valid driving license</li>
                      <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Clean driving record</li>
                      <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Professional attitude</li>
                      <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Smartphone for app usage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Join Section - Right Side - Vertical Format */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-12">
                How to Join
              </h2>
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex items-center justify-center">
                  <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-md">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      1
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Sign Up Online</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Complete our simple online registration form with your details and vehicle information.
                    </p>
                  </div>
                </div>
                
                {/* Arrow Down */}
                <div className="flex justify-center">
                  <ArrowDown className="w-8 h-8 text-green-600" />
                </div>

                {/* Step 2 */}
                <div className="flex items-center justify-center">
                  <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-md">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      2
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Get Verified</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Submit required documents for verification and pass our quality standards check.
                    </p>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <ArrowDown className="w-8 h-8 text-green-600" />
                </div>

                {/* Step 3 */}
                <div className="flex items-center justify-center">
                  <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-md">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      3
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Start Earning</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Once approved, start receiving bookings and earning more with TRUK's premium service network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center section-content">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Earn More?
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Join thousands of drivers already earning more with TRUK's verified booking system
          </p>
          <Button 
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 md:px-12 py-4 rounded-full text-lg md:text-xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={() => {
              console.log('Join TRUK Network button clicked');
              window.location.href = '/download';
            }}
          >
            Join TRUK Network
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DriverEnlistment;
