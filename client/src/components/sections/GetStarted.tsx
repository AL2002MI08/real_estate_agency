import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const GetStarted = () => {
    const navigate = useNavigate();

  return (
    <div id="get-started" className="w-full flex justify-center px-4 py-4">
      <div className="flex flex-col items-center gap-6 bg-purple-500 p-8 rounded-xl border-4 border-orange-400/30 text-center shadow-lg max-w-4xl w-full">
        <h2 className="text-white font-medium text-2xl sm:text-3xl">
          Get started with Kings
        </h2>
        <p className="text-white/80 text-base sm:text-lg leading-relaxed">
          Acquire your dream home swiftly by simply sharing your preferences
          with us.
          <br className="hidden sm:block" />
          Secure your ideal residence promptly.
        </p>

        <Button variant="none"
          onClick={() => navigate("/register")
          }
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default GetStarted;
