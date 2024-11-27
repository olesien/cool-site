import { Outlet, NavLink } from "react-router-dom";
import LatestProducts from "../components/LatestProducts";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Log In", href: "/login" },
  { name: "Help", href: "/help" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  //const { isDark, setIsDark } = useAppContext()
  return (
    <>
      <header>
        <NavLink to="/" className="logoLink">
          <div className="logo">Cool Site</div>
        </NavLink>
        <nav>
          <div className="inner-nav">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="mt-12">
        <LatestProducts />
        <Outlet />
      </main>
    </>
  );
}
