import React from 'react';
import { MdCall } from "react-icons/md";
import { BsWhatsapp, BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
const Contact: React.FC = () => {
  return (
    <div id="contact-us" className="py-8 px-4 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4 flex-1">
          <span className="text-orange-500 font-semibold">Contact Us</span>
          <span className="text-xl sm:text-2xl font-bold">Reach out anytime</span>
          <span className="text-gray-500 text-sm sm:text-base">
            We're always ready to provide top-notch services, firmly believing that a well-chosen living space can significantly improve your quality of life.
          </span>
          <div className="mt-6 lg:mt-8 flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:grid sm:grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row flex-wrap gap-4 lg:gap-6 w-full">
              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-md p-4 gap-4 transition-transform duration-300 hover:scale-110 hover:shadow-lg w-full sm:w-full lg:w-64">
                <div className="flex items-start gap-4 w-full">
                  <div className="flex items-center justify-center text-purple-500">
                    <MdCall size={25} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold">Call</span>
                    <span className="text-gray-500">00000000000</span>
                  </div>
                </div>
                <button className="w-full bg-blue-100 text-purple-500 font-semibold text-sm py-2 rounded hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 hover:text-white hover:scale-90 transition-transform duration-300">
                  Call Now
                </button>
              </div>

              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-md p-4 gap-4 transition-transform duration-300 hover:scale-110 hover:shadow-lg w-full sm:w-full lg:w-64">
                <div className="flex items-start gap-4 w-full">
                  <div className="flex items-center justify-center text-green-500">
                    <BsWhatsapp size={25} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold">WhatsApp</span>
                    <span className="text-gray-500">00000000000</span>
                  </div>
                </div>
                <button className="w-full bg-blue-100 text-purple-500 font-semibold text-sm py-2 rounded hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-600 hover:text-white hover:scale-90 transition-transform duration-300">
                  Chat Now
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:grid sm:grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row flex-wrap gap-4 lg:gap-6 w-full">
              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-md p-4 gap-4 transition-transform duration-300 hover:scale-110 hover:shadow-lg w-full sm:w-full lg:w-64">
                <div className="flex items-start gap-4 w-full">
                  <div className="flex items-center justify-center text-pink-500">
                    <FaInstagram size={25} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold">Instagram</span>
                    <span className="text-gray-500">@real_estate</span>
                  </div>
                </div>
                <button className="w-full bg-blue-100 text-purple-500 font-semibold text-sm py-2 rounded hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-600 hover:text-white hover:scale-90 transition-transform duration-300">
                  Follow
                </button>
              </div>

              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-md p-4 gap-4 transition-transform duration-300 hover:scale-110 hover:shadow-lg w-full sm:w-full lg:w-64">
                <div className="flex items-start gap-4 w-full">
                  <div className="flex items-center justify-center text-purple-500">
                    <BsTwitterX size={25} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold">X (Twitter)</span>
                    <span className="text-gray-500">@real_estate</span>
                  </div>
                </div>
                <button className="w-full bg-blue-100 text-purple-500 font-semibold text-sm py-2 rounded hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 hover:text-white hover:scale-90 transition-transform duration-300">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-t-full border-4 border-purple-200 overflow-hidden">
            <img
              src="src/assets/hero-image.png"
              alt="Contact"
              className="w-full h-[30rem] sm:h-[35rem] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;






