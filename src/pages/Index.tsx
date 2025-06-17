
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const Index = () => {
  const [api, setApi] = useState<any>();

  // Auto-scroll the carousel
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  const images = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">TRUK</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Your trusted logistics partner for agricultural and cargo transportation
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 border border-white/30 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">agriTRUK</h3>
              <p className="text-gray-700">Specialized agricultural logistics solutions</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 border border-white/30 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">cargoTRUK</h3>
              <p className="text-gray-700">Reliable cargo transportation services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emerald Green Section */}
      <section className="min-h-screen bg-emerald-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-8 items-center w-full relative z-10">
            {/* Left Content */}
            <div className="space-y-8">
              {/* User Stats with Circles */}
              <div className="flex items-center space-x-4">
                <div className="flex flex-col space-y-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
                <span className="text-white text-lg font-semibold">10,000+ active users</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-bold">
                  <span className="text-red-500">TRUK</span>
                  <span className="text-white">, East Africa's </span>
                  <span className="text-red-500">Smartest</span>
                  <span className="text-white"> Logistics system</span>
                </h2>
              </div>

              {/* Services */}
              <div className="flex space-x-6">
                <span className="text-white text-lg">agriTRUK</span>
                <span className="text-white text-lg">cargoTRUK</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium">
                  Join as a transporter
                </Button>
                <Button className="bg-white hover:bg-gray-100 text-emerald-600 px-8 py-3 rounded-full text-lg font-medium">
                  Request demo
                </Button>
              </div>
            </div>

            {/* Right Side - Animated Images */}
            <div className="relative h-96 md:h-full">
              <Carousel
                setApi={setApi}
                className="w-full h-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="h-full">
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="relative h-full">
                        <img
                          src={image}
                          alt={`Logistics image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg shadow-2xl transform transition-transform duration-1000 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-emerald-600/20 rounded-lg"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
