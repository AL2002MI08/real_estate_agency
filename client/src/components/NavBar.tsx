import { NavLink, useNavigate } from "react-router-dom";
import Button from "./ui/Button";

interface NavBarProps {
    loggedIn?: boolean;
}

export default function NavBar({ loggedIn = false }: NavBarProps) {
    const navigate = useNavigate()
    const guestLinks = [
        { name: "Residencies", to: "#residencies" },
        { name: "About", to: "#about" },
        { name: "Contact", to: "#contact" },
    ];

    const userLinks = [
        { name: "Properties", to: "/properties" },
        { name: "Bookings", to: "/bookings" },
        { name: "Favorites", to: "/favorites" },
    ];

    return (
        <nav className="sticky top-0 z-20 flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 justify-between p-6 shadow-md">
            <img src="src/assets/logo.png" alt="Logo" width={120} />
            <div className="hidden md:flex items-center space-x-6">
                {(loggedIn ? userLinks : guestLinks).map((link) =>
                    link.to.startsWith("#") ? (
                        <a
                            key={link.name}
                            href={link.to}
                            className="text-gray-100 hover:text-gray-400"
                        >
                            {link.name}
                        </a>
                    ) : (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-gray-900 ${isActive ? "font-bold text-blue-600" : ""}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    )
                )}

                {!loggedIn ? (
                    <Button variant="primary" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                ) : null}
            </div>
            <button className="md:hidden">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </nav>
    );
}
