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
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, ArrowRight, Shield, Clock, Users, Award, CheckCircle, MessageCircle, HeadphonesIcon, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [api, setApi] = useState<any>();
  const [feedbackApi, setFeedbackApi] = useState<any>();
  const [howItWorksApi, setHowItWorksApi] = useState<any>();
  const [faqCarouselApi, setFaqCarouselApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto-scroll the hero carousel
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  // Auto-scroll the how it works carousel
  useEffect(() => {
    if (!howItWorksApi) return;

    const interval = setInterval(() => {
      howItWorksApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [howItWorksApi]);

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

  const images = [
    "/agriTrukImg4.jpg",
    "/CargoImage2.jpg",
    "/agriTrukImg5.jpg",
    "/CargoImage5.jpg", 
    "/agriTrukImg1.jpg",
    "/CargoImage3.jpg",
    "/agriTrukImg2.jpg",
    "/CargoImage4.jpg",
    "/agriTrukImg8.jpg"
  ];

  const howItWorksImages = [
     "/CargoImage7.jpg"
  ];

  const feedbacks = [
    {
      rating: 5,
      comment: "TRUK has revolutionized our agricultural logistics. Fast, reliable, and efficient service every time.",
      photo: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=80&h=80&fit=crop&crop=face",
      name: "Sarah Kariuki",
      role: "Farm Manager"
    },
    {
      rating: 4,
      comment: "Excellent cargo transportation services. They handle our shipments with utmost care and professionalism.",
      photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=80&h=80&fit=crop&crop=face",
      name: "Michael Odongo",
      role: "Supply Chain Director"
    },
    {
      rating: 5,
      comment: "Outstanding logistics solutions for our business. TRUK understands our needs perfectly.",
      photo: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=80&h=80&fit=crop&crop=face",
      name: "Emma Nyaboke",
      role: "Operations Manager"
    },
    {
      rating: 4,
      comment: "The promptness of getting transportation through the TRUK App ensures my farm produce reaches the market fresh.",
      photo: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=80&h=80&fit=crop&crop=face",
      name: "Karen Nasimiyu",
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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (path: string) => {
    if (window.location.pathname === '/' && path.startsWith('#')) {
      scrollToSection(path.substring(1));
    } else if (path.startsWith('#')) {
      window.location.href = '/' + path;
    } else {
      window.location.href = path;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-yellow-400 ${i < rating ? 'fill-current' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

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
            transition: opacity 1s ease-out, transform 1s ease-out;
          }
          .animate-fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          .parallax-bg {
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
          }
          .hover-grow {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-grow:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
          @media (max-width: 768px) {
            .parallax-bg {
              background-attachment: scroll;
            }
          }
        `}
      </style>
      
      <Navbar />
      
      {/* Jungle Green Hero Section - Fixed responsiveness */}
      <section className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 relative overflow-hidden">
        {/* Background Images covering full section */}
        <div className="absolute inset-0 z-0">
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
                  <div className="relative h-full min-h-screen">
                    <img
                      src={image}
                      alt={`Background ${index + 1}`}
                      className="w-full h-full min-h-screen object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-800/95 via-green-800/80 to-transparent"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative z-20">
          <div className="w-full">
            {/* Left Content */}
            <div className="max-w-2xl space-y-6 md:space-y-8 animate-on-scroll pt-24 sm:pt-32 lg:pt-40">
              {/* User Stats with Overlapping Circles - Improved spacing for large screens */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full z-30 relative shadow-lg"></div>
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-black rounded-full z-20 relative -ml-2 md:-ml-3 shadow-lg"></div>
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full z-10 relative -ml-2 md:-ml-3 shadow-lg"></div>
                </div>
                <span className="text-white text-sm md:text-lg font-semibold">10,000+ active users</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-red-500">TRUK</span>
                  <span className="text-white">, East Africa's </span>
                  <span className="text-red-500">Smartest</span>
                  <span className="text-white"> Logistics system</span>
                </h2>
              </div>

              {/* Services - Vertical Layout with Descriptions - Made Bold */}
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <span className="text-black text-xl md:text-2xl font-bold block">agriTRUK</span>
                  <span className="text-white/80 text-base md:text-lg">Farm-to-Market Solutions for Farmers & Agribusinesses</span>
                </div>
                <div className="space-y-2">
                  <span className="text-black text-xl md:text-2xl font-bold block">cargoTRUK</span>
                  <span className="text-white/80 text-base md:text-lg">Businessess & individuals seeking transport services</span>
                </div>
              </div>

              {/* Buttons - Larger Size - All lead to /download */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Button 
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 md:px-16 py-4 md:py-6 rounded-full text-xl md:text-2xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
                  onClick={() => {
                    console.log("Join as a transporter button clicked");
                    navigate("/download");
                  }}
                >
                  Join as a transporter or a broker
                </Button>
                <Button 
                  className="bg-white hover:bg-gray-100 text-green-800 px-10 md:px-16 py-4 md:py-6 rounded-full text-xl md:text-2xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
                  onClick={() => {
                    console.log("Request demo button clicked");
                    navigate("/download");
                  }}
                >
                  Move goods
                </Button>
              </div>

              {/* Dial Option - Moved back to original position */}
              <div className="text-white text-lg md:text-xl">
                USSD Coming soon!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section with Interchanging Background and Real Images */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden" id="how-it-works">
        {/* Background Images */}
        <div className="absolute inset-0 z-0 parallax-bg" style={{ backgroundImage: `url(${howItWorksImages[0]})` }}></div>
        {/* <div className="absolute inset-0 bg-white/85"></div> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 text-center mb-12 md:mb-16 animate-on-scroll">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
            {/* Step 1 */}
            <div className="text-center animate-on-scroll bg-gradient-to-br from-green-50 to-green-100 backdrop-blur-sm p-6 rounded-lg shadow-lg relative border-2 border-green-500">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="w-full h-48 md:h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-6 overflow-hidden">
                <img
                  src="/OrderingImg.jpg"
                  alt="Person using phone"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Request Transport</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Submit your logistics request via our App or USSD with detailed information about your cargo or agricultural products.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center animate-on-scroll bg-gradient-to-br from-green-50 to-green-100 backdrop-blur-sm p-6 rounded-lg shadow-lg relative border-2 border-green-500">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="w-full h-48 md:h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-6 overflow-hidden">
                <img
                  src="/agriTrukImg2.jpg"
                  alt="Two people talking with vehicle"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Match with Transporters</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Our smart system connects you with verified transporters near you who specialize in your type of cargo.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center animate-on-scroll bg-gradient-to-br from-green-50 to-green-100 backdrop-blur-sm p-6 rounded-lg shadow-lg relative border-2 border-green-500">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="w-full h-48 md:h-64 bg-gradient-to-br from-red-100 to-red-200 rounded-lg mb-6 overflow-hidden">
                <img
                  src="/LiveTracking.jpg"
                  alt="Map with live tracking"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Track & Deliver</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Monitor your goods in real-time and receive updates until safe delivery to your destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Are Section - Moved after Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 mb-6 animate-on-scroll">
            Why TRUK is East Africa's #1 Choice
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12 animate-on-scroll">
            Join 10,000+ satisfied users who trust TRUK for reliable, efficient, and intelligent logistics solutions. 
            Our proven track record, cutting-edge technology, and unmatched network make us the undisputed leader in East African logistics.
          </p>
          
          {/* Key advantages */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 animate-on-scroll">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Market Leader</h3>
              <p className="text-gray-600">Trusted by 10,000+ users across East Africa with the largest verified transporter network</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-lg border-2 border-green-500">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Insured</h3>
              <p className="text-gray-600">Complete insurance coverage and verified transporters ensure your cargo is always protected</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Smart matching technology connects you with transporters in minutes, not hours</p>
            </div>
          </div>

          <Button 
            className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white px-8 py-3 rounded-full text-lg font-medium transform hover:scale-105 transition-all duration-200 animate-on-scroll"
            onClick={() => {
              console.log("Learn More About Us button clicked");
              navigate("/about");
            }}
          >
            Learn More About Us
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Industry Statistics Info Section - Improved responsive layout */}
      <section className="py-4 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 text-center">
            <div>
              <div className="text-xl sm:text-lg md:text-2xl font-bold text-yellow-400">2.5B</div>
              <div className="text-sm md:text-sm font-medium px-2">East Africa Logistics Market Value (USD)</div>
              <div className="text-xs text-gray-400 hidden md:block px-2">Annual market size</div>
            </div>
            <div>
              <div className="text-xl sm:text-lg md:text-2xl font-bold text-yellow-400">15%</div>
              <div className="text-sm md:text-sm font-medium px-2">Agricultural GDP Contribution</div>
              <div className="text-xs text-gray-400 hidden md:block px-2">Across East African countries</div>
            </div>
            <div>
              <div className="text-xl sm:text-lg md:text-2xl font-bold text-yellow-400">60%</div>
              <div className="text-sm md:text-sm font-medium px-2">Employment in Agriculture</div>
              <div className="text-xs text-gray-400 hidden md:block px-2">Regional workforce dependency</div>
            </div>
            <div>
              <div className="text-xl sm:text-lg md:text-2xl font-bold text-yellow-400">70%</div>
              <div className="text-sm md:text-sm font-medium px-2">Cargo Transported by Road</div>
              <div className="text-xs text-gray-400 hidden md:block px-2">Dominant mode in East Africa</div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Feedback Section - Full Green with Dots */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 parallax-bg"
          style={{ backgroundImage: `url(/CargoImage2.jpg)` }}
          onLoad={() => console.log('Feedback section background image loaded')}
          onError={() => console.log('Feedback section background image failed to load')}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 section-content">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 text-center mb-8">
          Experiences shared by our clients
        </h2>
        <div className="section-content">
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
                  <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg mx-2 transform hover:scale-105 transition-transform duration-300">
                    {/* Rating Stars */}
                    <div className="flex mb-4">
                      {renderStars(feedback.rating)}
                    </div>

                    {/* Comment */}
                    <p className="text-gray-700 mb-6 italic text-sm md:text-base">
                      "{feedback.comment}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center">
                      <img
                        src={feedback.photo}
                        alt={feedback.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-4"
                        onLoad={() => console.log(`Feedback photo ${index} loaded`)}
                        onError={() => console.log(`Feedback photo ${index} failed to load`)}
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base">{feedback.name}</h4>
                        <p className="text-gray-600 text-xs md:text-sm">{feedback.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-8 carousel-dots">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors duration-300 ${
                index === current ? 'bg-red-500 shadow-lg' : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => {
                console.log(`Nav dot ${index} clicked`);
                feedbackApi?.scrollTo(index);
              }}
            />
          ))}
        </div>
      </div>
    </section>

      {/* Mid-Page CTA Section with Background */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 parallax-bg" style={{ backgroundImage: `url(/CargoImage9.jpg)` }}></div>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="text-white animate-on-scroll">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Transform Your Logistics Today!
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Earn 25% more on verified bookings. Sign-up only takes 2 minutes.
            </p>
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 md:px-8 py-3 rounded-full text-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                console.log("Join our Transporter Networkt button clicked");
                navigate("/download");
              }}
            >
              Join our Transporter Network
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 mb-12 md:mb-16 animate-on-scroll">
            Our Partners
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-12 animate-on-scroll">
            <img
              src="/M-PESA_LOGO-01.svg.png"
              alt="M-PESA"
              className="h-16 md:h-24 object-contain hover:scale-110 transition-all duration-300"
            />
            <img
              src="/CIC insurance.png"
              alt="CIC Insurance"
              className="h-16 md:h-24 object-contain hover:scale-110 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* FAQs Section with Enhanced Left Side */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-100 to-gray-200" id="faqs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Left Side - Enhanced FAQ Support Section */}
            <div className="relative animate-on-scroll order-2 lg:order-1">
              <Carousel
                setApi={setFaqCarouselApi}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  <CarouselItem>
                    <div className="bg-gradient-to-br from-green-800 to-green-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/5 rounded-full"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <MessageCircle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">Need Help?</h3>
                            <p className="text-green-200 text-sm">We're here for you 24/7</p>
                          </div>
                        </div>
                        
                        <p className="mb-6 text-green-100">Have a different question? Our expert support team is ready to assist you with personalized solutions.</p>
                        
                        <div className="space-y-3 mb-6">
                           <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Phone className="w-5 h-5 text-green-300" />
                            <div>
                              <p className="font-semibold text-white">Call Us</p>
                              <a href="tel:+254758594951" className="text-green-200 text-sm hover:text-green-100 transition-colors">+254 758 594 951</a>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Mail className="w-5 h-5 text-green-300" />
                            <div>
                              <p className="font-semibold text-white">Email Us</p>
                              <a href="mailto:hello@trukafrica.com" className="text-green-200 text-sm hover:text-green-100 transition-colors">hello@trukafrica.com</a>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          className="bg-white text-green-800 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg w-full"
                          onClick={() => handleNavigation('#contact')}
                        >
                          Contact Support Team
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/5 rounded-full"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <HeadphonesIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">Live Chat</h3>
                            <p className="text-blue-200 text-sm">Instant responses</p>
                          </div>
                        </div>
                        
                        <p className="mb-6 text-blue-100">Get immediate assistance through our live chat support for quick solutions and real-time help.</p>
                        
                        <div className="bg-white/10 rounded-lg p-4 mb-6 backdrop-blur-sm">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">Support Online</span>
                          </div>
                          <p className="text-blue-200 text-sm">Average response time: &lt; 2 minutes</p>
                        </div>
                        
                        <Button 
                          className="bg-white text-blue-800 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg w-full"
                          onClick={() => handleNavigation('#contact')}
                        >
                          Start Live Chat
                          <MessageCircle className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                  
                  <CarouselItem>
                    <div className="bg-gradient-to-br from-purple-800 to-purple-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/5 rounded-full"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">Quick Solutions</h3>
                            <p className="text-purple-200 text-sm">Self-service help</p>
                          </div>
                        </div>
                        
                        <p className="mb-6 text-purple-100">Access our comprehensive help center with step-by-step guides and video tutorials.</p>
                        
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center space-x-2 text-purple-200">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Video tutorials</span>
                          </div>
                          <div className="flex items-center space-x-2 text-purple-200">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Step-by-step guides</span>
                          </div>
                          <div className="flex items-center space-x-2 text-purple-200">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Troubleshooting tips</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="bg-white text-purple-800 hover:bg-purple-50 px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg w-full"
                          onClick={() => handleNavigation('#contact')}
                        >
                          Browse Help Center
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>

            {/* Right Side - FAQs */}
            <div className="animate-on-scroll order-1 lg:order-2">
              <p className="text-sm text-gray-600 mb-2">FAQs</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-4 md:mb-6 lg:mb-8">
                How can we help you?
              </h2>
              <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border shadow-sm">
                    <AccordionTrigger className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left font-medium text-sm sm:text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-3 sm:px-4 md:px-6 pb-3 md:pb-4 text-gray-600 text-sm sm:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Background */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/CargoImage8.jpg"
            alt="Final CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="text-white animate-on-scroll">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
              East Africa moves smarter with TRUK
            </h2>
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 md:px-8 py-3 rounded-full text-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                console.log("Get Early Access button clicked");
                navigate("/download");
              }}
            >
              Get Early Access
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Improved responsive design */}
      <footer className="bg-gradient-to-br from-black to-gray-900 text-white py-12 md:py-16" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 - Logo & Description */}
            <div className="animate-on-scroll sm:col-span-2 lg:col-span-1 text-center sm:text-left">
              <div className="mb-4 flex items-center justify-center sm:justify-start">
                <img 
                  src="/TRUK Logo3.png"
                  alt="TRUK Logo"
                  className="h-20 w-auto md:h-24"
                />
              </div>
              <p className="text-gray-400 text-sm">
                East Africa's smartest logistics platform connecting cargo owners with verified transporters for efficient and reliable transportation solutions.
              </p>
            </div>

            {/* Column 2 - Services */}
            <div className="animate-on-scroll text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/agritruk" className="hover:text-white transition-colors text-sm">agriTRUK</a></li>
                <li><a href="/cargotruk" className="hover:text-white transition-colors text-sm">cargoTRUK</a></li>
                <li><a href="/brokers" className="hover:text-white transition-colors text-sm">Broker enlistment</a></li>
                <li><a href="/transporter-enlistment" className="hover:text-white transition-colors text-sm">Transporter Enlistment</a></li>
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div className="animate-on-scroll text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors text-sm">Contact Us</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors text-sm">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm">Careers</a></li>
              </ul>
            </div>

            {/* Column 4 - Follow Us */}
            <div className="animate-on-scroll text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
                <Facebook 
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" 
                  onClick={() => window.open('https://web.facebook.com/profile.php?id=61577130358564', '_blank')}
                />
                {/* X logo (formerly Twitter) */}
                <svg 
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  onClick={() => window.open('https://x.com/TRUKLTD', '_blank')}
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <Instagram 
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" 
                  onClick={() => window.open('https://www.instagram.com/truk_ltd?igsh=MWhnMjkyZHhmajI4bg%3D%3D&utm_source=qr', '_blank')}
                />
                <Linkedin 
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" 
                  onClick={() => window.open('https://www.linkedin.com/company/truk-ltd/posts/?feedView=all', '_blank')}
                />
                {/* TikTok logo */}
                <svg 
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  onClick={() => window.open('https://www.tiktok.com/@truk_ltd', '_blank')}
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="flex items-center justify-center sm:justify-start">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>hello@trukafrica.com</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <a href="tel:+254758594951" className="hover:text-gray-300 transition-colors">+254 758 594 951</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 TRUK. All rights reserved.</p>
            <p className="mt-2">
              Developed by{' '}
              <a 
                href="https://mglobalbusinessconsultancy.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                M'Global Business Consultancy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;