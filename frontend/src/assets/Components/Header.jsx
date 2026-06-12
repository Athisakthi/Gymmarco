import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dumbbell, Sun, Moon } from "lucide-react";
import "./Header.css";

function Header({ theme, toggleTheme }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const isAuthenticated = !!localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (userRole === "Trainer") {
            const fetchUnreadCount = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/contact/unread-count');
                    const data = await response.json();
                    if (data.success) {
                        setUnreadCount(data.count);
                    }
                } catch (err) {
                    console.error("Error fetching unread count:", err);
                }
            };

            fetchUnreadCount();
            
            // Listen for custom event from Messages component
            window.addEventListener('messageRead', fetchUnreadCount);
            
            const interval = setInterval(fetchUnreadCount, 30000); // Check every 30 seconds
            return () => {
                clearInterval(interval);
                window.removeEventListener('messageRead', fetchUnreadCount);
            };
        }
    }, [userRole, location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        window.dispatchEvent(new Event("authChange"));
        handleNavigation("/login");
    };

    let navItems = [
        { name: "Home", path: "/" },
        { name: "Packages", path: "/packages" },
        { name: "Men's", path: "/mens" },
        { name: "Women's", path: "/womens" },
        { name: "Contact", path: "/contact" },
    ];

    if (isAuthenticated && userRole === "Trainer") {
        navItems = [
            { name: "Dashboard", path: "/admin" },
            { name: "Messages", path: "/messages" }
        ];
    }

    if (location.pathname === "/login" || location.pathname === "/signup") {
        navItems = [];
    }

    return (
        <header className={`header-container ${isScrolled ? "scrolled" : ""}`}>
            <nav className="navbar glass">
                <div className="logo-section" onClick={() => handleNavigation("/")}>
                    <Dumbbell className="logo-icon" size={32} />
                    <span className="logo-text">GYMMARCO</span>
                </div>

                <ul className="nav-links desktop-only">
                    {navItems.map((item) => (
                        <li
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={`${location.pathname === item.path ? "active" : ""} nav-item-container`}
                        >
                            {item.name}
                            {item.name === "Messages" && unreadCount > 0 && (
                                <span className="nav-notification-dot"></span>
                            )}
                            {location.pathname === item.path && (
                                <motion.div layoutId="underline" className="nav-underline" />
                            )}
                        </li>
                    ))}
                </ul>

                <div className="header-actions desktop-only">
                    {!isAuthenticated ? (
                        location.pathname === "/signup" ? (
                            <button
                                className="btn-outline"
                                onClick={() => handleNavigation("/login")}
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                className="btn-outline"
                                onClick={() => handleNavigation("/signup")}
                            >
                                Sign Up
                            </button>
                        )
                    ) : (
                        <button
                            className="btn-outline"
                            onClick={handleLogout}
                            style={{ color: "#ef4444", borderColor: "rgba(239, 68, 68, 0.3)" }}
                        >
                            Logout
                        </button>
                    )}
                    {isAuthenticated && userRole !== "Trainer" && (
                        <button
                            className="btn-primary"
                            onClick={() => handleNavigation("/contact")}
                        >
                            Book Now
                        </button>
                    )}

                    <button className="theme-toggle glass" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <div className="mobile-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mobile-menu glass"
                    >
                        {navItems.map((item) => (
                            <div
                                key={item.path}
                                className="mobile-link"
                                onClick={() => handleNavigation(item.path)}
                                style={{ position: 'relative' }}
                            >
                                {item.name}
                                {item.name === "Messages" && unreadCount > 0 && (
                                    <span className="nav-notification-dot"></span>
                                )}
                            </div>
                        ))}

                        <div className="mobile-actions">
                            {!isAuthenticated ? (
                                location.pathname === "/signup" ? (
                                    <button
                                        className="btn-outline"
                                        style={{ flex: 1 }}
                                        onClick={() => handleNavigation("/login")}
                                    >
                                        Login
                                    </button>
                                ) : (
                                    <button
                                        className="btn-outline"
                                        style={{ flex: 1 }}
                                        onClick={() => handleNavigation("/signup")}
                                    >
                                        Sign Up
                                    </button>
                                )
                            ) : (
                                <button
                                    className="btn-outline"
                                    style={{ flex: 1, color: "#ef4444", borderColor: "rgba(239, 68, 68, 0.3)" }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            )}
                            {userRole !== "Trainer" && (
                                <button
                                    className="btn-primary"
                                    style={{ flex: 1 }}
                                    onClick={() => handleNavigation("/contact")}
                                >
                                    Book Now
                                </button>
                            )}
                            <button className="theme-toggle glass" onClick={toggleTheme}>
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;