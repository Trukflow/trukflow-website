
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const AgriTruk = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=800&fit=crop"
            alt="Agricultural landscape"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-red-500">agri</span><span className="text-white">TRUK</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">
            Specialized agricultural produce transportation solutions
          </p>
          <p className="text-base md:text-lg opacity-90 mb-8">
            Connecting farmers with markets efficiently and reliably
          </p>
          <Button 
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
            onClick={() => window.location.href = '/download'}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-16">
            Why Choose agriTRUK?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚛</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Specialized Vehicles</h3>
              <p className="text-gray-600">
                Temperature-controlled and specialized vehicles for fresh produce transportation
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick turnaround times to ensure freshness from farm to market
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600">
                Simple mobile app interface designed specifically for farmers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-lg p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transport your produce?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of farmers using agriTRUK
            </p>
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
              onClick={() => window.location.href = '/download'}
            >
              Download agriTRUK
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgriTruk;
