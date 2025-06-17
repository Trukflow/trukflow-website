
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Mail, Phone } from "lucide-react";

const Index = () => {
  const [api, setApi] = useState<any>();
  const [feedbackApi, setFeedbackApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  // Auto-scroll the carousel
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  // Track feedback carousel current slide
  useEffect(() => {
    if (!feedbackApi) return;

    const onSelect = () => {
      setCurrent(feedbackApi.selectedScrollSnap());
    };

    feedbackApi.on("select", onSelect);
    onSelect();

    return () => feedbackApi?.off("select", onSelect);
  }, [feedbackApi]);

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

  const faqs = [
    {
      question: "How does TRUK work?",
      answer: "TRUK connects cargo owners with verified transporters through our smart logistics platform. Simply submit your transport request, get matched with suitable transporters, and track your shipment in real-time."
    },
    {
      question: "What types of cargo can I transport?",
      answer: "We handle both agricultural products through agriTRUK and general cargo through cargoTRUK. This includes farm produce, manufactured goods, and various commercial shipments."
    },
    {
      question: "How do I become a transporter on TRUK?",
      answer: "Join our transporter network by signing up through our platform. You'll need to complete verification, provide necessary documentation, and can start earning up to 25% more on verified bookings."
    },
    {
      question: "Is my cargo insured during transport?",
      answer: "Yes, all shipments through TRUK are covered by our comprehensive insurance policy to ensure your cargo is protected throughout the journey."
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
      
      {/* Jungle Green Hero Section */}
      <section className="min-h-screen bg-green-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-8 items-center w-full relative z-10">
            {/* Left Content */}
            <div className="space-y-8 relative z-20">
              {/* User Stats with Overlapping Circles */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full z-30 relative"></div>
                  <div className="w-6 h-6 bg-black rounded-full z-20 relative -ml-3"></div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-full z-10 relative -ml-3"></div>
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

              {/* Dial Option */}
              <div className="text-white text-lg">
                Or dial *000# to book your transport
              </div>
            </div>

            {/* Right Side - Images with Blur Effect */}
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-green-800/30 to-transparent z-20 pointer-events-none"></div>
              <div className="absolute inset-0 backdrop-blur-sm z-10"></div>
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
      <section className="py-20 bg-white" id="how-it-works">
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
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-green-800"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-white" style={{background: 'linear-gradient(to right, #065f46 75%, white 75%)'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500 text-center mb-16">
            Customer Feedback
          </h2>
          <div className="flex">
            {/* Feedback Carousel - 3/4 width */}
            <div className="w-3/4 pr-8">
              <Carousel
                setApi={setFeedbackApi}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {feedbacks.map((feedback, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white rounded-lg p-6 shadow-lg mx-2">
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
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Navigation Bullets - 1/4 width */}
            <div className="w-1/4 flex items-center justify-center">
              <div className="flex space-x-2">
                {feedbacks.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === current ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                    onClick={() => feedbackApi?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-800 rounded-lg p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your logistics?
            </h2>
            <p className="text-xl mb-8">
              Earn 25% more on verified bookings. Sign-up only takes 2 minutes.
            </p>
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium">
              Join our Transporter Network
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-16">
            Our Partners
          </h2>
          <div className="flex justify-center items-center space-x-12">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=100&fit=crop"
              alt="Partner 1"
              className="h-24 object-contain grayscale hover:grayscale-0 transition-all"
            />
            <img
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200&h=100&fit=crop"
              alt="Partner 2"
              className="h-24 object-contain grayscale hover:grayscale-0 transition-all"
            />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left Side - Chat Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=500&fit=crop"
                alt="Chat Support"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg border">
                <p className="text-green-800 font-medium">Ask Us Anything</p>
              </div>
            </div>

            {/* Right Side - FAQs */}
            <div>
              <p className="text-sm text-gray-600 mb-2">FAQs</p>
              <h2 className="text-4xl font-bold text-red-500 mb-8">
                How can we help you?
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-4 text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-800 rounded-lg p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              East Africa moves smarter with TRUK
            </h2>
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium">
              Get Early Access
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Column 1 - Logo & Description */}
            <div>
              <div className="text-2xl font-bold mb-4">TRUK</div>
              <p className="text-gray-400 text-sm">
                East Africa's smartest logistics platform connecting cargo owners with verified transporters for efficient and reliable transportation solutions.
              </p>
            </div>

            {/* Column 2 - Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">agriTRUK</a></li>
                <li><a href="#" className="hover:text-white transition-colors">cargoTRUK</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Driver Enlistment</a></li>
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Column 4 - Follow Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4 mb-6">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Youtube className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Nairobi, Kenya
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  hello@truk.co.ke
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +254 700 000 000
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 TRUK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
