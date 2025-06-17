
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

  const feedbacks = [
    {
      rating: 5,
      comment: "TRUK has revolutionized our agricultural logistics. Fast, reliable, and efficient service every time.",
      photo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=80&h=80&fit=crop&crop=face",
      name: "Sarah Johnson",
      role: "Farm Manager"
    },
    {
      rating: 4,
      comment: "Excellent cargo transportation services. They handle our shipments with utmost care and professionalism.",
      photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=80&h=80&fit=crop&crop=face",
      name: "Michael Chen",
      role: "Supply Chain Director"
    },
    {
      rating: 5,
      comment: "Outstanding logistics solutions for our business. TRUK understands our needs perfectly.",
      photo: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=80&h=80&fit=crop&crop=face",
      name: "Emma Williams",
      role: "Operations Manager"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-yellow-400 ${i < rating ? 'fill-current' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Jungle Green Section */}
      <section className="min-h-screen bg-green-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-8 items-center w-full relative z-10">
            {/* Left Content */}
            <div className="space-y-8">
              {/* User Stats with Circles */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center -space-x-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-white z-30"></div>
                  <div className="w-6 h-6 bg-black rounded-full border-2 border-white z-20"></div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-white z-10"></div>
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
                <Button className="bg-white hover:bg-gray-100 text-green-800 px-8 py-3 rounded-full text-lg font-medium">
                  Request demo
                </Button>
              </div>
            </div>

            {/* Right Side - Images with Fade Effect */}
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-green-800/50 to-transparent z-20 pointer-events-none"></div>
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
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500 text-center mb-16">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
                alt="Step 1"
                className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Transport</h3>
              <p className="text-gray-600">
                Submit your logistics request through our platform with detailed information about your cargo or agricultural products.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
                alt="Step 2"
                className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Match with Transporters</h3>
              <p className="text-gray-600">
                Our smart system connects you with verified transporters who specialize in your type of cargo.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
                alt="Step 3"
                className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track & Deliver</h3>
              <p className="text-gray-600">
                Monitor your shipment in real-time and receive updates until safe delivery to your destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Feedback Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500 text-center mb-16">
            Customer Feedback
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {renderStars(feedback.rating)}
                </div>
                
                {/* Comment */}
                <p className="text-gray-700 mb-6 italic">
                  "{feedback.comment}"
                </p>
                
                {/* Customer Info */}
                <div className="flex items-center">
                  <img
                    src={feedback.photo}
                    alt={feedback.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{feedback.name}</h4>
                    <p className="text-gray-600 text-sm">{feedback.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
