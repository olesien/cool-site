import { useAppContext } from "@/contexts/useAppContext";
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Log In", href: "/login" },
    { name: "Help", href: "/help" },
];

export default function Layout() {
    const { isLoggedIn, logout } = useAppContext();
    const isMobile = useIsMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu on mobile

    const logoLinkStyles = {
        textDecoration: "none",
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
            <header className="header">
                <NavLink to="/" style={logoLinkStyles}>
                    <div className="header-logo">Cool Fashion</div>
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
