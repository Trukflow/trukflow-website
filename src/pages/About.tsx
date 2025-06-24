
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { useEffect } from "react";

const About = () => {
  const team = [
  {
    name: "Abisai Nandi",
    role: "Co-founder & Chief Executive Officer",
    image: "/AbisaiPhoto.jpg",
    bio: "Logistics and agribusiness entrepreneur with 10+ years transforming East Africa's supply chains through technology.",
    linkedin: "https://www.linkedin.com/in/abisai-nandi-443405145/"
  },
  {
    name: "Josephine Mumbua",
    role: "Co-founder & Chief Technology Officer", 
    image: "/photo_2025-06-19 23.37.40.jpeg",
    bio: "Senior Software Engineer specializing in scalable backend systems and cloud infrastructure for the logistics platforms.",
    linkedin: "https://www.linkedin.com/in/mumbuamutuku/"
  },
  {
    name: "Mititi Isaac",
    role: "Co-founder & Chief Marketing Officer",
    image: "/Official Photo.jpg",
    bio: "Full-stack Software Engineer and UX designer; part of the team building TRUK's customer-facing interfaces and brand systems.",
    linkedin: "https://www.linkedin.com/in/io-mititi/"
  }
];

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

  return (
    <div className="min-h-screen bg-gray-50">
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
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-on-scroll">
            About <span className="text-red-500">TRUK</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-on-scroll">
            We're revolutionizing logistics across East Africa with smart technology 
            that connects cargo owners with verified transporters.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold text-red-500 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To transform logistics in East Africa by providing a smart, reliable, 
                and efficient platform that connects cargo owners with verified transporters, 
                ensuring seamless movement of goods across the region.
              </p>
            </div>
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold text-red-500 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become East Africa's leading logistics platform, enabling economic 
                growth through efficient transportation solutions that benefit farmers, 
                businesses, and transporters alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Hierarchy - Reduced to 3 members */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-red-500 text-center mb-16 animate-on-scroll">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 animate-on-scroll">
                <div className="w-full h-64 overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <Linkedin 
                      className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                      onClick={() => window.open(member.linkedin, '_blank')}
                    />
                  </div>
                  <p className="text-red-500 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-red-500 text-center mb-16 animate-on-scroll">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-on-scroll">
              <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl font-bold">R</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">
                We ensure consistent, dependable service that our customers can trust.
              </p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl font-bold">I</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our technology to serve our users better.
              </p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl font-bold">T</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust</h3>
              <p className="text-gray-600">
                We build lasting relationships through transparency and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 animate-on-scroll">Join Our Mission</h2>
          <p className="text-xl mb-8 animate-on-scroll">
            Be part of East Africa's logistics revolution
          </p>
          <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-full text-lg font-medium transform hover:scale-105 transition-all duration-200 animate-on-scroll"
                  onClick={() => window.location.href = '/download'}>
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
