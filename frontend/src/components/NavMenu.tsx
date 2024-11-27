import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
const options = [
  {
    name: "Woman",
    subcategories: [
      {
        name: "Jackets",
        link: "/woman-jackets",
      },
      {
        name: "Party",
        link: "/woman/party",
      },
      {
        name: "Tops",
        link: "/women/tops",
      },
      {
        name: "Dresses",
        link: "/women/dresses",
      },
      {
        name: "Outerwear",
        link: "/women/outerwear",
      },

      {
        name: "Jeans & Pants",
        link: "/women/jeans-pants",
      },
      {
        name: "Skirts & Shorts",
        link: "/women/skirts-shorts",
      },

      { name: "Sweaters &Cardigans", link: "/women sweaters-cardigans" },

      { name: "Blazers", link: "/women/blazers" },

      { name: "Sale", link: "/women/sale" },
    ],
  },
  {
    name: "Man",
    subcategories: [
      {
        name: "Jackets",
        link: "/man/jackets",
      },
      { name: "T-Shirts", link: "/men/t-shirts" },
      { name: "Hoodies & Sweatshirts", link: "/men/hoodies" },

      { name: "Pants & Jeans", link: "/men/pants-jeans" },
      { name: "Shorts", link: "/men/shorts" },
      { name: "Sweaters & Knitwear", link: "/men/sweaters-knitwear" },
      { name: "Vests & Tank Tops", link: "/men/vests-tank-tops" },
      { name: "Sale", link: "/men/sale" },
    ],
  },
  {
    name: "Kids",
    subcategories: [
      {
        name: "Jackets",
        link: "/kids/jackets",
      },
      { name: "T-Shirts", link: "/kids/t-shirts" },
      { name: "Hoodies & Sweatshirts", link: "/kids/hoodies" },

      { name: "Pants & Jeans", link: "/kids/pants-jeans" },
      { name: "Shorts", link: "/kids/shorts" },
      { name: "Sale", link: "/kids/sale" },
    ],
  },
];

export function NavMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCats, setShowCats] = useState<{ [key: string]: boolean }>({});
  const isMobile = useIsMobile();
  return (
    <div className="cat-container">
      {!isMobile && (
        <div className="desktop-categories">
          {options.map((cat) => (
            <div className="dropdown">
              <span>{cat.name.toUpperCase()}</span>
              <ul className="dropdown-content">
                {cat.subcategories.map((subcat) => (
                  <li>
                    <NavLink key={subcat.link} to={subcat.link}>
                      {subcat.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {isMobile && (
        <div className="mobile-categories">
          <FontAwesomeIcon
            className="icon"
            icon={faBars}
            onClick={() => setShowDropdown((old) => !old)}
          />
          {showDropdown && (
            <ul className="dropdown">
              {options.map((cat) => {
                return (
                  <>
                    <li
                      onClick={() =>
                        setShowCats((oldCats) => ({
                          ...oldCats,
                          [cat.name]: !oldCats[cat.name],
                        }))
                      }
                    >
                      {cat.name.toUpperCase()}
                    </li>
                    {showCats[cat.name] && (
                      <>
                        {cat.subcategories.map((subcat) => (
                          <li className="subcatlink">
                            <NavLink key={subcat.link} to={subcat.link}>
                              {subcat.name}
                            </NavLink>
                          </li>
                        ))}
                      </>
                    )}
                  </>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
