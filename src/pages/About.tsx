import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const team = [
  {
    name: "Abisai Nandi",
    role: "Founder & CEO, TRUKFLOW Ventures",
    image: "/AbisaiPhoto.jpg",
    bio: "Serial entrepreneur with 10+ years building and scaling complex supply chain and distribution operations across East Africa. Grew a multi-branch agribusiness spanning fleet logistics, cold storage, farmer aggregation, distribution and last-mile delivery to over $1M in revenue across 20+ locations. At TRUKFLOW Ventures, Abisai brings that hard-earned operational depth to building East Africa's smartest logistics and commerce infrastructure. His approach is simple: build the backbone first. Every TRUKFLOW product is designed by someone who has lived the inefficiencies and knows exactly how to fix them across the team.",
    linkedin: "https://www.linkedin.com/in/abisai-nandi-443405145/"
  },
  {
    name: "Ayub Ng'ang'a",
    role: "CTO & Systems Engineer",
    image: "/Ayub Ng'ang'a.jpeg",
    bio: "IoT and embedded systems engineer with 6+ years of experience deploying connected energy storage, PV, and microgrid solutions across emerging markets. Specializes in firmware, telemetry, cloud integration, and secure OTA systems, with hands-on experience delivering scalable diagnostics, monitoring, and remote control infrastructure for distributed ESS fleets across East Africa.",
    linkedin: "https://www.linkedin.com/in/ayubnganga/"
  },
  {
    name: "Dickson Mumo",
    role: "Lead IoT & Hardware Engineer",
    image: "/Dickson.jpg",
    bio: "Firmware and hardware engineer with 8+ years of experience building embedded systems across automotive, agriculture, medical devices, and consumer electronics. Brings deep expertise in microcontrollers, wireless connectivity, schematic capture, and PCB design, delivering production-ready connected hardware from concept through deployment.",
    linkedin: "https://www.linkedin.com/in/dickson-mumo-4bba7697/"
  },
  {
    name: "Mumbua Mutuku",
    role: "Co-founder & Backend Engineer", 
    image: "/photo_2025-06-19 23.37.40.jpeg",
    bio: "Senior Software Engineer with 10+ years of experience specializing in scalable backend systems and cloud infrastructure for the logistics platforms.",
    linkedin: "https://www.linkedin.com/in/mumbuamutuku/"
  },
  {
    name: "Mititi Isaac",
    role: "Co-founder, Frontend Engineer & Branding",
    image: "/Official Photo.jpg",
    bio: "Full-stack Software Engineer and UX designer with 5+ years of experience; part of the team building TRUKFLOW's customer-facing interfaces and brand systems.",
    linkedin: "https://www.linkedin.com/in/io-mititi/"
  },
];

const industryStats = [
  { 
    number: "2.5B", 
    label: "East Africa Logistics Market Value (USD)", 
    sublabel: "Annual market size (2023)",
    detail: "Projected to grow at 7.2% CAGR through 2030 due to rising trade and infrastructure investments."
  },
  { 
    number: "15%", 
    label: "Agricultural GDP Contribution", 
    sublabel: "Across East African countries",
    detail: "Agriculture drives logistics demand, but inefficiencies cost the region ~$1.5B yearly."
  },
  { 
    number: "60%", 
    label: "Employment in Agriculture", 
    sublabel: "Regional workforce dependency",
    detail: "Highlights the need for cold-chain logistics to reduce post-harvest losses."
  },
  { 
    number: "80%", 
    label: "Post-harvest Losses", 
    sublabel: "Due to poor logistics",
    detail: "Lack of storage, poor roads, and limited cold transport worsen food insecurity."
  },
  { 
    number: "40%", 
    label: "Intra-African Trade Costs", 
    sublabel: "Above global average",
    detail: "AfCFTA aims to reduce tariffs, but non-tariff barriers (e.g., customs delays) persist."
  },
  { 
    number: "70%", 
    label: "Cargo Transported by Road", 
    sublabel: "Dominant mode in East Africa",
    detail: "Rail and maritime underutilized; Mombasa and Dar es Salaam ports handle 90% of trade."
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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-neutral-100">
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
      <section className="pt-40 md:pt-44 pb-16 bg-gradient-to-br from-neutral-950 via-neutral-900 to-stone-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-on-scroll">
            About <span className="text-orange-500">TRUKFLOW</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-on-scroll">
            We're revolutionizing logistics across East Africa with smart technology 
            that connects cargo owners with verified transporters.
          </p>
        </div>
      </section>

      {/* Industry Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-neutral-950 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 text-center mb-12 animate-on-scroll">
            The Challenge We're Solving
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {industryStats.map((stat, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <div className="text-2xl md:text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
                <div className="text-sm md:text-base font-medium mb-1">{stat.label}</div>
                <div className="text-xs md:text-sm text-gray-400">{stat.sublabel}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-300 max-w-4xl mx-auto mt-8 animate-on-scroll">
            East Africa's logistics sector faces significant challenges with massive post-harvest losses 
            and inefficient transportation systems. TRUKFLOW is transforming this landscape with innovative 
            technology solutions that connect stakeholders and optimize supply chains.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold text-orange-500 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To transform logistics in East Africa by providing a smart, reliable, 
                and efficient platform that connects cargo owners with verified transporters, 
                ensuring seamless movement of goods across the region.
              </p>
            </div>
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold text-orange-500 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become East Africa's leading logistics platform, enabling economic 
                growth through efficient transportation solutions that benefit farmers, 
                businesses, and transporters alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Hierarchy */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-orange-500 text-center mb-16 animate-on-scroll">
            Our Leadership Team
          </h2>
          <div className="max-w-4xl mx-auto">
            {/* CEO centered */}
            <div className="flex justify-center mb-10">
              <div className="w-full sm:w-3/4 md:w-1/2">
                <div className="bg-white/95 rounded-lg shadow-lg shadow-stone-300/40 overflow-hidden transform hover:scale-105 transition-all duration-300 animate-on-scroll border border-orange-100">
                  <div className="w-full h-64 overflow-hidden bg-neutral-100">
                    <img
                      src={team[0].image}
                      alt={team[0].name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {team[0].name}
                      </h3>
                      <img 
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDA3NmIyIj4KPHBhdGggZD0iTTIwLjQ0NyAyMC40NTJoLTMuNTU0di01LjU2OWMwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDZjLjQ3Ny0uOSAxLjYzNy0xLjg1IDMuMzctMS44NSAzLjYwMSAwIDQuMjY3IDIuMzcgNC4yNjcgNS40NTV2Ni4yODZ6TTUuMzM3IDcuNDMzYy0xLjE0NCAwLTIuMDYzLS45MjYtMi4wNjMtMi4wNjUgMC0xLjEzOC45Mi0yLjA2NS0yLjA2NCAyLjA2NXptMS43ODIgMTMuMDE5SDMuNTU1VjloMy41NjR2MTEuNDUyek0yMi4yMjUgMEgxLjc3MUMuNzkyIDAgMCAuNzc0IDAgMS43Mjl2MjAuNTQyQzAgMjMuMjI3Ljc5MiAyNCAxLjc3MSAyNGgyMC40NTFDMjMuMiAyNCAyNCAyMy4yMjcgMjQgMjIuMjcxVjEuNzI5QzI0IC43NzQgMjMuMiAwIDIyLjIyMiAwaDMuMDAzeiIvPgo8L3N2Zz4="
                        alt="LinkedIn"
                        className="w-5 h-5 hover:opacity-80 cursor-pointer transition-opacity"
                        onClick={() => window.open(team[0].linkedin, '_blank')}
                      />
                    </div>
                    <p className="text-orange-500 font-medium mb-3">
                      {team[0].role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {team[0].bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other leaders */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
              {team.slice(1).map((member, index) => (
                <div key={index} className="bg-white/95 rounded-lg shadow-lg shadow-stone-300/40 overflow-hidden transform hover:scale-105 transition-all duration-300 animate-on-scroll border border-orange-100">
                  <div className="w-full h-64 overflow-hidden bg-neutral-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full ${
                        member.name === "Dickson Mumo" ? "object-cover object-top" : "object-contain"
                      }`}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {member.name}
                      </h3>
                      <img 
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDA3NmIyIj4KPHBhdGggZD0iTTIwLjQ0NyAyMC40NTJoLTMuNTU0di01LjU2OWMwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDZjLjQ3Ny0uOSAxLjYzNy0xLjg1IDMuMzctMS44NSAzLjYwMSAwIDQuMjY3IDIuMzcgNC4yNjcgNS40NTV2Ni4yODZ6TTUuMzM3IDcuNDMzYy0xLjE0NCAwLTIuMDYzLS45MjYtMi4wNjMtMi4wNjUgMC0xLjEzOC45Mi0yLjA2NS0yLjA2NCAyLjA2NXptMS43ODIgMTMuMDE5SDMuNTU1VjloMy41NjR2MTEuNDUyek0yMi4yMjUgMEgxLjc3MUMuNzkyIDAgMCAuNzc0IDAgMS43Mjl2MjAuNTQyQzAgMjMuMjI3Ljc5MiAyNCAxLjc3MSAyNGgyMC40NTFDMjMuMiAyNCAyNCAyMy4yMjcgMjQgMjIuMjcxVjEuNzI5QzI0IC43NzQgMjMuMiAwIDIyLjIyMiAwaDMuMDAzeiIvPgo8L3N2Zz4="
                        alt="LinkedIn"
                        className="w-5 h-5 hover:opacity-80 cursor-pointer transition-opacity"
                        onClick={() => window.open(member.linkedin, '_blank')}
                      />
                    </div>
                    <p className="text-orange-500 font-medium mb-3">
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
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-orange-500 text-center mb-16 animate-on-scroll">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-on-scroll">
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-950 to-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl font-bold">R</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">
                We ensure consistent, dependable service that our customers can trust.
              </p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-950 to-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl font-bold">I</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our technology to serve our users better.
              </p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-950 to-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
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
      <section className="py-16 bg-gradient-to-br from-neutral-950 via-neutral-900 to-stone-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 animate-on-scroll">Join Our Mission</h2>
          <p className="text-xl mb-8 animate-on-scroll">
            Be part of East Africa's logistics revolution
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-medium transform hover:scale-105 transition-all duration-200 animate-on-scroll"
                  onClick={() => navigate('/download')}>
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
