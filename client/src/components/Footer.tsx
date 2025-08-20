const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-3">
      <div className=" px-4 sm:px-8 max-w-7xl mx-auto flex justify-center md:justify-between gap-8">
        <div className="flex flex-col items-start gap-4 text-center md:text-left md:items-start">
          <img src="src/assets/logo.png" alt="" width={140} />
          <span className="text-white">
            Elevate Your Lifestyle With Us!
          </span>
        </div>

        <div className="flex flex-col items-start text-center md:text-left md:items-start">
          <span className="text-white font-semibold">Our Location</span>
          <span className="text-white">Kigali, KG 92 St, Rwanda</span>
        </div>
      </div>

      <div className="px-4 sm:px-8 max-w-7xl mx-auto py-4 border-t border-gray-200">
        <div className="text-center text-white text-sm">
          © {new Date().getFullYear()} Kings Real Estate. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;