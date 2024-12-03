import { useAppContext } from "@/contexts/useAppContext";
import { Outlet, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons/faSignIn";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons/faBoxArchive";
import { faShirt } from "@fortawesome/free-solid-svg-icons/faShirt";

const navigation = [
    {
        name: "Home", href: "/", icon: <FontAwesomeIcon
            className="icon"
            icon={faHome}
        />
    },
    // { name: "About", href: "/about", icon={faHome} },
    {
        name: "Log In", href: "/login", icon: <FontAwesomeIcon
            className="icon"
            icon={faSignIn}
        />
    },
    {
        name: "Help", href: "/help", icon: <FontAwesomeIcon
            className="icon"
            icon={faQuestionCircle}
        />
    },
];

export default function Layout() {
    const { user, logout } = useAppContext();

    const activeNavLinkStyles = {
        backgroundColor: "#2B6CB0", // Active state background color (blue)
        color: "#FFFFFF", // Active state text color
    };

    const hoverNavLinkStyles = {
        backgroundColor: "#4A5568", // Hover background color (dark gray)
        color: "#FFFFFF", // Hover text color
    };


    return (
        <>
            {/* Eye-catching Header */}
            <header className="header">
                <NavLink to="/" className={"logo-link-styles"}>
                    <div className="header-logo">Cool Fashion</div>
                </NavLink>
            </header>

            {/* Navigation */}
            <nav className="nav">
                {/* Navigation Links */}
                <div className="inner-nav">
                    {navigation.map((item) => {
                        if (item.name === "Log In" && user) { //We want to access login and we are logged in, then change it to Log out
                            return <a
                                key={item.name}
                                href="#"
                                className="nav-links"
                                style={({ ...hoverNavLinkStyles })}
                                onClick={() => logout()}
                            >
                                {item.icon}
                                <span>Logout</span>
                            </a>
                        }
                        return <NavLink
                            key={item.name}
                            to={item.href}
                            className="nav-links"
                            style={({ isActive }) => ({
                                ...(isActive ? activeNavLinkStyles : {}),
                                ...(!isActive ? hoverNavLinkStyles : {}),
                            })}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    })}
                    {!!user && <>

                        {/* Add favorite page link here*/}

                        {user.admin && <>
                            <NavLink
                                to={'/admin/categories'}
                                className="nav-links"
                                style={({ isActive }) => ({
                                    ...(isActive ? activeNavLinkStyles : {}),
                                    ...(!isActive ? hoverNavLinkStyles : {}),
                                })}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faBoxArchive}
                                />
                                <span>Categories</span>
                            </NavLink>

                            <NavLink

                                to={'/admin/products'}
                                className="nav-links"
                                style={({ isActive }) => ({
                                    ...(isActive ? activeNavLinkStyles : {}),
                                    ...(!isActive ? hoverNavLinkStyles : {}),
                                })}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faShirt}
                                />
                                <span>Products</span>
                            </NavLink>
                        </>}
                    </>}
                </div>
            </nav>

            {/* Main Content */}
            <main className="mt-12">
                <Outlet />
            </main>
        </>
    );
}
