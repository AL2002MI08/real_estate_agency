import { useState, type JSX } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaShieldAlt, FaTimesCircle, FaChartLine } from "react-icons/fa";

interface AccordionItem {
  icon: JSX.Element;
  title: string;
  content: string;
}

const Mission: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items: AccordionItem[] = [
    {
      icon: <FaShieldAlt className="text-purple-500" size={22} />,
      title: "Best interest rates on the market",
      content:
        "Explore our premium properties with the assurance of securing the best interest rates on the market, ensuring a financially savvy investment tailored to your needs.",
    },
    {
      icon: <FaTimesCircle className="text-purple-500" size={22} />,
      title: "Prevent unstable prices",
      content:
        "Our market research and analysis help keep property prices stable and fair, giving you confidence in your investment.",
    },
    {
      icon: <FaChartLine className="text-purple-500" size={22} />,
      title: "Best price on the market",
      content:
        "We ensure you get the most competitive prices available, maximizing your returns and value.",
    },
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="rounded-t-full border-4 border-purple-200 overflow-hidden">
            <img
              src="src/assets/keys.jpg"
              alt="House and Keys"
              className="w-full h-[30rem] sm:h-[35rem] object-cover"
            />
          </div>
        </div>
        <div>
          <h4 className="text-orange-500 font-bold text-2xl">Our Mission</h4>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mt-2">
            Our suite of professional services.
          </h2>
          <p className="mt-4 text-gray-500 text-base leading-relaxed">
            We specialize in guiding you through a curated selection of luxury
            residences that align with your budgetary considerations, ensuring
            you find your ideal dream home.
          </p>

          <div className="mt-8 space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`border border-gray-200/20 rounded-lg p-5 shadow-md transition-all duration-300 ${
                  openIndex === idx ? "shadow-lg" : ""
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-50 p-3 rounded-lg">{item.icon}</div>
                    <span className="font-semibold text-blue-950 text-lg">{item.title}</span>
                  </div>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    } text-purple-400`}
                  />
                </button>

                {openIndex === idx && (
                  <p className="mt-3 text-gray-500 text-base">{item.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
