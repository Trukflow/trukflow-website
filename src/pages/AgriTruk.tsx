import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { ArrowDown } from "lucide-react";

const AgriTruk = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoImages = [
    "/agriTrukImg8.jpg",
    "/agriTrukImg1.jpg",
    "/agriTrukImg2.jpg",
    "/agriTrukImg5.jpg"
  ];

  // Simulate loading for initial render
  useEffect(() => {
    console.log('Starting loading timer');
    const timer = setTimeout(() => {
      console.log('Loading complete');
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-switch videos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [videoImages.length]);

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
      <section className="min-h-screen bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/agriTrukImg4.jpg"
            alt="Agricultural background"
            className="w-full h-full object-cover"
            onLoad={() => console.log('Hero image loaded')}
            onError={() => console.log('Hero image failed to load')}
          />
          <div className="absolute inset-0 bg-green-800/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center relative z-10">
          <div className="w-full text-center text-white section-content">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-red-500">agri</span>TRUK
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto">
              Specialized agricultural produce transportation solutions for farmers across East Africa
            </p>
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 md:px-16 py-4 md:py-6 rounded-full text-xl md:text-2xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                console.log('Transport Your Harvest button clicked');
                window.location.href = '/download';
              }}
            >
              Transport Your Harvest
            </Button>
          </div>
        </div>
      </section>

      {/* Video & How It Works Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Video Section */}
            <div className="section-content">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 mb-8">
                See agriTRUK in Action
              </h2>
              <div className="relative w-full">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg overflow-hidden shadow-2xl relative">
                  <img
                    src={videoImages[currentVideoIndex]}
                    alt="agriTRUK video preview"
                    className="w-full h-full object-cover transition-opacity duration-500"
                    onLoad={() => console.log('Video section image loaded')}
                    onError={() => console.log('Video section image failed to load')}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button 
                      className="bg-white/90 hover:bg-white text-green-800 rounded-full p-4 transform hover:scale-110 transition-all duration-200 shadow-lg"
                      onClick={() => {
                        console.log('Video play button clicked');
                        window.location.href = '/download';
                      }}
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </Button>
                  </div>
                </div>
                <p className="text-center text-gray-600 mt-4 text-sm md:text-base">
                  Watch how farmers are transforming their logistics with agriTRUK
                </p>
                
                {/* Video Navigation Dots */}
                <div className="flex justify-center space-x-2 mt-4">
                  {videoImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentVideoIndex ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      onClick={() => setCurrentVideoIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - How It Works */}
            <div className="section-content">
              <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-8">
                How it works
              </h2>
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Post Your Requirements</h3>
                    <p className="text-gray-600">
                      Submit details about your agricultural produce, quantity, pickup location, and destination through our platform.
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-green-700" />
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Matched</h3>
                    <p className="text-gray-600">
                      Our system connects you with verified transporters who specialize in agricultural produce handling.
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-green-700" />
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Track & Deliver</h3>
                    <p className="text-gray-600">
                      Monitor your produce transportation in real-time until safe delivery to your destination market.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-content">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 text-center mb-12 md:mb-16">
            Why Choose agriTRUK?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🚜</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Farm-to-Market</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Direct transportation from your farm to markets, ensuring fresh produce reaches consumers quickly.
              </p>
            </div>
            <div className="text-center md:col-span-2 lg:col-span-1 bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-green-500">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">❄️</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Cold Chain Storage</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Temperature-controlled transportation to maintain product quality and extend shelf life.
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Real-time Tracking</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Monitor your agricultural products throughout the journey with live GPS tracking and updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center section-content">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Farm's Logistics?
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Join thousands of farmers already using agriTRUK for their produce transportation
          </p>
          <Button 
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 md:px-12 py-4 rounded-full text-lg md:text-xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={() => {
              console.log('Get Started Today button clicked');
              window.location.href = '/download';
            }}
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AgriTruk;
