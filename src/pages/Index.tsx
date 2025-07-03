
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Index = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    console.log(`Attempting to navigate to section: ${sectionId}`);
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        console.log(`Scrolling to section ${sectionId} on current page`);
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log(`Section ${sectionId} not found on /, navigating to /#${sectionId}`);
        navigate(`/#${sectionId}`);
      }
    } else {
      console.log(`Not on /, navigating to /#${sectionId}`);
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/agriTrukImg1.jpg"
            alt="Agricultural transport"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.log('Hero image failed to load, using fallback');
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/70 to-green-900/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative z-10">
          <div className="w-full text-center text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Revolutionizing <span className="text-green-400">Agricultural</span> Transport
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto">
              Connect farmers with reliable transporters for seamless delivery of fresh produce
            </p>
            <Button 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-xl font-medium shadow-2xl hover:shadow-green-500/30 transform hover:scale-105 transition-all duration-200"
              onClick={() => navigate('/download')}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Why Choose <span className="text-green-600">TRUK</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🚚</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Reliable Transport</h3>
              <p className="text-gray-600">Connect with verified transporters for secure and timely delivery of your agricultural products.</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Easy Booking</h3>
              <p className="text-gray-600">Simple app interface to book transport services with transparent pricing and real-time tracking.</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🌱</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fresh Produce</h3>
              <p className="text-gray-600">Specialized handling for agricultural products to maintain freshness from farm to market.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            How It <span className="text-green-600">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Book Transport</h3>
              <p className="text-gray-600">Enter your pickup and delivery details through our user-friendly mobile app.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Matched</h3>
              <p className="text-gray-600">Our system connects you with verified transporters in your area instantly.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Track & Deliver</h3>
              <p className="text-gray-600">Monitor your shipment in real-time and receive confirmation upon delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Our <span className="text-green-600">Services</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">agriTRUK</h3>
              <p className="text-gray-600 mb-6">Specialized transport for agricultural products with proper handling and storage.</p>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
                onClick={() => navigate('/agritruk')}
              >
                Learn More
              </Button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">cargoTRUK</h3>
              <p className="text-gray-600 mb-6">General cargo transport for various goods with flexible scheduling options.</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                onClick={() => navigate('/cargotruk')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            Frequently Asked <span className="text-green-600">Questions</span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left side - Creative illustration */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-lg">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <span className="text-white text-xl sm:text-2xl md:text-3xl">💡</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Got Questions?</h3>
                  <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                    We're here to help! Find answers to common questions about our transport services.
                  </p>
                  
                  {/* Feature highlights */}
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex items-center justify-center space-x-2 md:space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-xs sm:text-sm md:text-base">24/7 Customer Support</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 md:space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-xs sm:text-sm md:text-base">Real-time Tracking</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 md:space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-xs sm:text-sm md:text-base">Verified Transporters</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 md:space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-xs sm:text-sm md:text-base">Secure Payments</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full opacity-20 hidden sm:block"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 bg-blue-400 rounded-full opacity-20 hidden sm:block"></div>
              <div className="absolute top-1/2 -right-3 sm:-right-6 w-4 h-4 sm:w-6 sm:h-6 bg-purple-400 rounded-full opacity-20 hidden lg:block"></div>
            </div>

            {/* Right side - FAQ Accordion */}
            <div className="space-y-4 order-1 lg:order-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 text-sm sm:text-base">
                    How do I book a transport service?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm sm:text-base">
                    Simply download our TRUK app, create an account, enter your pickup and delivery details, and we'll match you with available transporters in your area.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 text-sm sm:text-base">
                    What types of agricultural products can be transported?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm sm:text-base">
                    We handle a wide variety of agricultural products including fresh fruits, vegetables, grains, livestock feed, and other farm produce. Our transporters are equipped to handle different types of cargo.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 text-sm sm:text-base">
                    How is pricing determined?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm sm:text-base">
                    Pricing is based on factors such as distance, cargo type, weight, and current demand. You'll see transparent pricing before confirming your booking, with no hidden fees.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 text-sm sm:text-base">
                    Can I track my shipment?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm sm:text-base">
                    Yes! Our app provides real-time tracking so you can monitor your shipment's progress from pickup to delivery. You'll receive updates at every stage of the journey.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 text-sm sm:text-base">
                    What if there's damage to my goods during transport?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm sm:text-base">
                    All our transporters are verified and insured. In the rare event of damage, we have a comprehensive claims process to ensure you're compensated fairly and quickly.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Get <span className="text-green-400">Started</span>?
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Join thousands of farmers and transporters who trust TRUK for their agricultural transport needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-2xl hover:shadow-green-500/30 transform hover:scale-105 transition-all duration-200"
                onClick={() => navigate('/download')}
              >
                Download App
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-medium transition-all duration-200"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/TRUK Logo3.png" alt="TRUK Logo" className="h-12 w-auto mb-4" />
              <p className="text-gray-400">Revolutionizing agricultural transport across Kenya</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/agritruk')}>agriTRUK</button></li>
                <li><button onClick={() => navigate('/cargotruk')}>cargoTRUK</button></li>
                <li><button onClick={() => navigate('/driver-enlistment')}>Driver Enlistment</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/about')}>About Us</button></li>
                <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
                <li><button onClick={() => scrollToSection('faqs')}>FAQs</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Download</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/download')}>Mobile App</button></li>
                <li>Coming to iOS & Android</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TRUK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
