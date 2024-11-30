import { useAppContext } from "@/contexts/useAppContext";
import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Log In", href: "/login" },
    { name: "Help", href: "/help" },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

// Hook for detecting if the screen is mobile
const getIsMobile = () => window.innerWidth <= 768;

export default function Layout() {
    const { isLoggedIn, logout } = useAppContext();
    const [isMobile, setIsMobile] = useState(getIsMobile());
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu on mobile

    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsMobile());
        };

        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // Header styles
    const headerStyles = {
        display: "flex",
        justifyContent: "center", // Center the logo
        alignItems: "center",
        padding: "20px", // Add padding for spacing
        background: "linear-gradient(90deg, #614AC9, #CFC914)", // Eye-catching gradient background
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    };

    const logoLinkStyles = {
        textDecoration: "none",
    };

    const logoStyles = {
        fontSize: "28px", // Large font for emphasis
        fontWeight: "bold", // Make the text bold
        color: "#FFFFFF", // White text for contrast
        textTransform: "uppercase", // Make the logo text uppercase
        letterSpacing: "2px", // Add some spacing between letters
        background: "linear-gradient(90deg, #FFFFFF, #FFD700)", // Gradient effect inside the text
        WebkitBackgroundClip: "text", // Clip the gradient to the text
        WebkitTextFillColor: "transparent", // Make the background visible through the text
        transition: "transform 0.3s ease", // Add a smooth scaling effect
        cursor: "pointer",
    };

    // Inline styles for nav and inner-nav (including mobile responsiveness)
    const navStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row", // Stack items vertically on mobile
        backgroundColor: isMobile && isMenuOpen ? "#2D3748" : "transparent", // Change background color when menu is open
        position: "relative", // Make sure it's positioned under the header
        width: "100%",
        top: "0", // Ensure the nav is positioned directly under the header
        transition: "all 0.3s ease",
        marginTop: isMobile ? "10px" : "0", // Add space on mobile between logo and nav
    };

    const innerNavStyles = {
        display: "flex",
        gap: "20px",
        flexDirection: isMobile && isMenuOpen ? "column" : "row", // Stack items vertically when menu is open
        alignItems: "center",
        padding: "10px",
    };

    const navLinkStyles = {
        textDecoration: "none",
        color: "#E2E8F0", // Light gray color for links
        padding: "8px 16px",
        fontSize: "14px",
        borderRadius: "8px",
        transition: "background-color 0.3s, color 0.3s", // Smooth transition
    };

    const activeNavLinkStyles = {
        backgroundColor: "#2B6CB0", // Active state background color (blue)
        color: "#FFFFFF", // Active state text color
    };

    const hoverNavLinkStyles = {
        backgroundColor: "#4A5568", // Hover background color (dark gray)
        color: "#FFFFFF", // Hover text color
    };

    const closeButtonStyles = {
        display: isMobile && isMenuOpen ? "block" : "none",
        backgroundColor: "#4A5568",
        color: "#FFFFFF",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "10px",
    };

    return (
        <>
            {/* Eye-catching Header */}
            <header style={headerStyles}>
                <NavLink to="/" style={logoLinkStyles}>
                    <div style={logoStyles}>Cool Fashion</div>
                </NavLink>
            </header>

            {/* Navigation */}
            <nav style={navStyles}>
                {/* Navigation Links */}
                <div style={innerNavStyles}>
                    {navigation.map((item) => {
                        if (item.name === "Log In" && isLoggedIn) { //We want to access login and we are logged in, then change it to Log out
                            return <a
                                href="#"
                                style={({ ...navLinkStyles, ...hoverNavLinkStyles })}
                                onClick={() => logout()}
                            >
                                Logout
                            </a>
                        }
                        return <NavLink
                            key={item.name}
                            to={item.href}
                            style={({ isActive }) => ({
                                ...navLinkStyles,
                                ...(isActive ? activeNavLinkStyles : {}),
                                ...(!isActive ? hoverNavLinkStyles : {}),
                            })}
                        >
                            {item.name}
                        </NavLink>
                    })}
                    {isLoggedIn && <>
                        <NavLink
                            to={'/admin/categories'}
                            style={({ isActive }) => ({
                                ...navLinkStyles,
                                ...(isActive ? activeNavLinkStyles : {}),
                                ...(!isActive ? hoverNavLinkStyles : {}),
                            })}
                        >
                            Categories
                        </NavLink>

                        <NavLink

                            to={'/admin/products'}
                            style={({ isActive }) => ({
                                ...navLinkStyles,
                                ...(isActive ? activeNavLinkStyles : {}),
                                ...(!isActive ? hoverNavLinkStyles : {}),
                            })}
                        >
                            Products
                        </NavLink>
                    </>}
                </div>

                {/* Close button when mobile menu is open */}
                <div style={closeButtonStyles} onClick={() => setIsMenuOpen(false)}>
                    Close Menu
                </div>
            </nav>

            {/* Main Content */}
            <main className="mt-12">
                <Outlet />
            </main>
        </>
    );
}
