
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Download = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
            Download <span className="text-red-500">TRUK</span> App
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">
            Get started with East Africa's smartest logistics platform
          </p>
          <p className="text-base md:text-lg opacity-90">
            Scan this QR code or click the link below to download the app
          </p>
        </div>
      </section>

      {/* Download Options */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Google Play Store */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 md:p-8 text-center shadow-lg">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 flex items-center justify-center">
                <img 
                  src="/Google_PlayStore.png"
                  alt="Get TRUK on Google Play" 
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Google Play Store
              </h3>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Download TRUK for Android devices from the Google Play Store
              </p>
              <Button className="bg-black text-white hover:bg-gray-800 px-6 md:px-8 py-3 rounded-full text-base md:text-lg font-medium w-full flex items-center justify-center space-x-3 shadow-lg">
                <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span>Download from Play Store</span>
              </Button>
            </div>

            {/* Apple App Store */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 md:p-8 text-center shadow-lg">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path fill="#000000" d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Apple App Store
              </h3>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Download TRUK for iOS devices from the Apple App Store
              </p>
              <Button className="bg-black hover:bg-gray-800 text-white px-6 md:px-8 py-3 rounded-full text-base md:text-lg font-medium w-full flex items-center justify-center space-x-3 shadow-lg">
                <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
                <span>Download from App Store</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-12 md:mb-16">
            App Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-lg md:text-2xl">📱</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Book your transport with just a few taps on your mobile device
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-lg md:text-2xl">📍</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Real-time Tracking</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Track your shipment in real-time from pickup to delivery
              </p>
            </div>
            <div className="text-center md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-lg md:text-2xl">💳</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Safe and secure payment options integrated into the app
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USSD Alternative */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            No Smartphone? No Problem!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            You can also book transport using our USSD service
          </p>
          <div className="bg-gradient-to-br from-green-800 to-green-900 text-white rounded-lg p-6 md:p-8 inline-block shadow-2xl">
            <p className="text-xl md:text-2xl font-bold mb-2">USSD Coming soon!</p>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Download;
