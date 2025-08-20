import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./ui/Button";
import { guestLinks, userLinks } from "../constants/navigation";
import type { NavBarProps } from "../types/utils";
import { AddPropertyModal } from "./AddPropertyModal";

export default function NavBar({ loggedIn = false, sectionsRef, onLogout }: NavBarProps) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleNavigation = (id: string) => {
        const section = sectionsRef?.[id];
        if (section?.current) {
            section.current.scrollIntoView({ behavior: "smooth" });
        }
        setIsMenuOpen(false);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-md">
            <div className="flex items-center justify-between p-6">
                <img src="./logo.png" alt="Logo" width={120} />
                <div className="hidden md:flex items-center gap-7 text-nowrap">
                    {(loggedIn ? userLinks : guestLinks).map((link) =>
                        "id" in link ? (
                            <button
                                key={link.id}
                                onClick={() => handleNavigation(link.id)}
                                className="text-gray-100 hover:text-gray-400 transition-colors"
                            >
                                {link.name}
                            </button>
                        ) : (
                            <NavLink
                                key={link.name}
                                to={link.to!}
                                className={({ isActive }) =>
                                    `text-gray-100 hover:text-gray-400 transition-colors ${isActive ? "font-bold text-blue-400" : ""
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        )
                    )}

                    {!loggedIn ? (
                        <Button variant="primary" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    ) : 
                    (
                        <>
                        <Button variant="secondary" onClick={() => setModalOpen(true)}>
                            Add Property
                        </Button>
                            <AddPropertyModal opened={modalOpen} setOpened={setModalOpen}/>

                        <Button variant="secondary" onClick={onLogout}>
                            Logout
                        </Button>
                        </>
                    )}
                </div>
                <Button
                    variant="icon"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    className="md:hidden flex-col space-y-1"
                >
                    <span
                        className={`block w-6 h-0.5 bg-gray-100 transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-gray-100 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-gray-100 transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                            }`}
                    />
                </Button>
            </div>
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                ? 'max-h-screen opacity-100 visible'
                : 'max-h-0 opacity-0 invisible overflow-hidden'
                }`}>
                <div className="px-6 pb-6 space-y-4 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600">
                    {(loggedIn ? userLinks : guestLinks).map((link) =>
                        "id" in link ? (
                            <Button
                                key={link.id}
                                onClick={() => handleNavigation(link.id)}
                                className="block w-full text-left text-gray-100 hover:text-blue-400 py-2 transition-colors border-b border-gray-600 last:border-b-0"
                            >
                                {link.name}
                            </Button>
                        ) : (
                            <NavLink
                                key={link.name}
                                to={link.to!}
                                onClick={handleLinkClick}
                                className={({ isActive }) =>
                                    `block text-gray-100 hover:text-blue-400 py-2 transition-colors border-b border-gray-600 last:border-b-0 ${isActive ? "font-bold text-blue-400" : ""
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        )
                    )}
                    <div className="pt-4">
                        {!loggedIn ? (
                            <Button
                                variant="primary"
                                onClick={() => {
                                    navigate("/login");
                                    handleLinkClick();
                                }}
                                className="w-full"
                            >
                                Login
                            </Button>
                        ) : (
 <div className="flex flex-col gap-4">
                        <Button variant="secondary" onClick={() => setModalOpen(true)}>
                            Add Property
                        </Button>
                            <AddPropertyModal opened={modalOpen} setOpened={setModalOpen}/>

                        
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    onLogout?.();
                                    handleLinkClick();
                                }}
                                className="w-full"
                                >
                                Logout
                            </Button>
                                </div>
                            

                        )}
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div
                    onClick={() => setIsMenuOpen(false)}
                />
                
            )}
        </nav>
    );
}