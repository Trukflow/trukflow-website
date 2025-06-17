
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Download = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Download <span className="text-red-500">TRUK</span> App
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Get started with East Africa's smartest logistics platform
          </p>
          <p className="text-lg opacity-90">
            Available on your favorite app store
          </p>
        </div>
      </section>

      {/* Download Options */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Google Play Store */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-24 h-24 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">GP</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Google Play Store
              </h3>
              <p className="text-gray-600 mb-6">
                Download TRUK for Android devices from the Google Play Store
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-medium w-full">
                Download from Play Store
              </Button>
            </div>

            {/* Apple App Store */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-24 h-24 bg-black rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">AS</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Apple App Store
              </h3>
              <p className="text-gray-600 mb-6">
                Download TRUK for iOS devices from the Apple App Store
              </p>
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-medium w-full">
                Download from App Store
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-red-500 text-center mb-16">
            App Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600">
                Book your transport with just a few taps on your mobile device
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">
                Track your shipment in real-time from pickup to delivery
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Safe and secure payment options integrated into the app
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USSD Alternative */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            No Smartphone? No Problem!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            You can also book transport using our USSD service
          </p>
          <div className="bg-green-800 text-white rounded-lg p-8 inline-block">
            <p className="text-2xl font-bold mb-2">Dial</p>
            <p className="text-4xl font-bold">*000#</p>
            <p className="text-lg mt-2">to book your transport</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Download;
