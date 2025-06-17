
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      {/* Main Content - with top padding to account for fixed navbar */}
      <div className="pt-16 min-h-screen flex items-center justify-center">
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
    </div>
  );
};

export default Index;
