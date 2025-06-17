
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const About = () => {
  const team = [
    {
      name: "David Kimani",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Visionary leader with 15+ years in logistics and technology."
    },
    {
      name: "Sarah Wanjiku",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=300&h=300&fit=crop&crop=face",
      bio: "Tech innovator driving TRUK's smart logistics solutions."
    },
    {
      name: "Michael Ochieng",
      role: "Chief Operations Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Operations expert ensuring seamless logistics execution."
    },
    {
      name: "Grace Muthoni",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Marketing strategist building TRUK's brand across East Africa."
    },
    {
      name: "Peter Kiptoo",
      role: "Head of Business Development",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      bio: "Partnership expert expanding TRUK's network reach."
    },
    {
      name: "Mary Akinyi",
      role: "Head of Customer Success",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face",
      bio: "Customer advocate ensuring exceptional service delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-red-500">TRUK</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We're revolutionizing logistics across East Africa with smart technology 
            that connects cargo owners with verified transporters.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-red-500 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To transform logistics in East Africa by providing a smart, reliable, 
                and efficient platform that connects cargo owners with verified transporters, 
                ensuring seamless movement of goods across the region.
              </p>
            </div>
            <div>
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

      {/* Company Hierarchy */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-red-500 text-center mb-16">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
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
          <h2 className="text-4xl font-bold text-red-500 text-center mb-16">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">R</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">
                We ensure consistent, dependable service that our customers can trust.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">I</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our technology to serve our users better.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8">
            Be part of East Africa's logistics revolution
          </p>
          <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium">
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
