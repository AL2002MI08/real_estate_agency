import CountUp from "react-countup";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative z-10 text-white pt-6 pb-8  from-gray-900 via-gray-800 to-gray-600 bg-gradient-to-bl">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto flex justify-between items-end flex-col sm:flex-row gap-8 sm:gap-4 pt-8 sm:pt-0">

        <div className="flex flex-col gap-12 sm:gap-12 w-full sm:w-auto">
          <div className="relative z-10">
            <div className="absolute h-16 w-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full right-[28%] -top-[10%] -z-10" />

            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeIn",
              }}
              className="font-semibold text-[2.5rem] leading-[3rem] sm:text-[3.8rem] sm:leading-[4rem]"
            >
              Kings<br />
              Real Estate
              <br /> Agency
            </motion.h1>
          </div>

          <div className="flex flex-col text-gray-300">
            <span>Effortlessly discover your ideal property with our expert assistance.</span>
            <span>Let us simplify your home search, effortlessly overcoming all difficulties.</span>
          </div>

          <div className="flex w-full items-center gap-6 sm:gap-0 justify-center sm:justify-between flex-wrap sm:flex-nowrap">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-[2rem] font-bold">
                <CountUp start={80} end={900} duration={4} />
                <span className="text-orange-500">+</span>
              </span>
              <span className="text-gray-300 text-sm sm:text-base">Properties</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-[2rem] font-bold">
                <CountUp start={15} end={200} duration={4} />
                <span className="text-orange-500">+</span>
              </span>
              <span className="text-gray-300 text-sm sm:text-base">Happy Customer</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full sm:w-auto">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeIn",
            }}
            className="w-[95%] h-[25rem] sm:w-[30rem] sm:h-[35rem] overflow-hidden rounded-t-[15rem] border-8 border-purple-300/20"
          >
            <img src="src/assets/hero-image.png" alt="houses" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;