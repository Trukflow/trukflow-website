
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DriverEnlistment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 md:px-16 py-4 md:py-6 rounded-full text-xl md:text-2xl font-medium shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                console.log('Start Earning Today button clicked');
                navigate('/download');
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
            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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

      {/* Requirements Section - Fixed alignment */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-12">
            Requirements
          </h2>
          <div className="flex justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex justify-center">
                  <div className="w-full max-w-xs text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Requirements</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> Insurance coverage
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> Good vehicle condition
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-xs text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Driver Requirements</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> Valid driver’s license
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> Clean driving record
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> Professional attitude
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span> Smartphone for app usage
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-content">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-12">
            How to Join
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sign Up Online</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Complete our simple online registration form with your details and vehicle information.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Get Verified</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Submit required documents for verification and pass our quality standards check.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Pay Monthly Fee</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                  Experience the platform free for 30 days. Thereafter, choose a subscription plan that suits your needs.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Start Earning</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Once approved, access the platform and start receiving bookings through TRUK's network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-content">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-12">
            Subscription Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Monthly Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Monthly</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-red-500">KES 199</span>
                  <span className="text-gray-600 text-lg">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">Full app access</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">Unlimited bookings</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">24/7 support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => navigate('/download')}
                >
                  Choose Monthly
                </Button>
              </div>
            </div>

            {/* Quarterly Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-green-300 transform scale-105">
              <div className="text-center">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quarterly</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-red-500">KES 499</span>
                  <span className="text-gray-600 text-lg">/3 months</span>
                  <div className="text-sm text-green-600 font-medium">Save KES 98</div>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">Full app access</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">Unlimited bookings</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">24/7 support</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">Priority booking alerts</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => navigate('/download')}
                >
                  Choose Quarterly
                </Button>
              </div>
            </div>

            {/* Yearly Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Yearly</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-red-500">KES 1,599</span>
                  <span className="text-gray-600 text-lg">/year</span>
                  <div className="text-sm text-green-600 font-medium">Save KES 789</div>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">Full app access</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">Unlimited bookings</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">24/7 support</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">Priority booking alerts</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 
                    <span className="text-gray-600">Analytics dashboard</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => navigate('/download')}
                >
                  Choose Yearly
                </Button>
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
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 md:px-12 py-4 rounded-full text-lg md:text-xl font-medium shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 transition-all duration-200"
            onClick={() => {
              console.log('Join TRUK Network button clicked');
              navigate('/download');
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
