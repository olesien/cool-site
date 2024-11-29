import { useAppContext } from "@/contexts/useAppContext";
import { Outlet, NavLink } from "react-router-dom";

const navigation = [
    { name: 'Home', href: '/', admin: false }, { name: 'About', href: '/about', admin: false }, { name: "Log In", href: '/login' }, { name: "Help", href: "/help" },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Layout() {
    const { isLoggedIn, logout } = useAppContext()
    return (
        <>
            <header>
                <NavLink to="/" className="logoLink">
                    <div className="logo">Cool Fashion</div>
                </NavLink>
                <nav>
                    <div className="inner-nav">
                        {navigation.map((item) => {
                            if (item.name === "Log In" && isLoggedIn) { //We want to access login and we are logged in, then change it to Log out
                                return <a
                                    href="#"
                                    onClick={() => logout()}
                                >
                                    Logout
                                </a>
                            } else {
                                return <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={({ isActive }) =>
                                        classNames(
                                            isActive
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            }
                        }

                        )}

                    </div>
                </nav>
            </header>
            <main className='mt-12'>
                <Outlet />
            </main>
        </>
    )
}
