import { useRef, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Contact from "../components/sections/Contact";
import Mission from "../components/sections/Mission";
import PopularResidencies from "../components/sections/PopularResidencies";
import GetStarted from "../components/sections/GetStarted";
import { useAuth } from "../hooks/useAuth";

const Layout: React.FC = () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const sectionsRef = {
    residencies: useRef<HTMLDivElement>(null!),
    about: useRef<HTMLDivElement>(null!),
    contact: useRef<HTMLDivElement>(null!),
  };

  const commonSectionClasses = "min-h-screen flex items-center justify-center";
  useEffect(() => {
    if (loggedIn && location.pathname === "/") {
      navigate("/residencies", { replace: true });
    }
  }, [loggedIn, location.pathname, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar loggedIn={loggedIn} sectionsRef={sectionsRef} onLogout={logout} />

      <main className="flex-grow">
        <Outlet />

        {!loggedIn && (
          <>
            <section
              ref={sectionsRef.residencies}
              id="residencies"
            >
              <PopularResidencies />
            </section>

            <section
              ref={sectionsRef.about}
              id="about"
              className={commonSectionClasses}
            >
              <Mission />
            </section>

            <section
              ref={sectionsRef.contact}
              id="contact"
              className={commonSectionClasses}
            >
              <Contact />
            </section>

            <section id="get-started" className="flex justify-center py-8">
              <GetStarted />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
