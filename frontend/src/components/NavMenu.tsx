import { NavLink } from "react-router-dom"

const options = [
    {
        name: "Woman",
        subcategories: [{
            name: "Jackets",
            link: "/woman/jackets"
        }, {
            name: "Party",
            link: "/woman/party"
        }]
    },
    {
        name: "Man",
        subcategories: [{
            name: "Jackets",
            link: "/man/jackets"
        }]
    },
    {
        name: "Kids",
        subcategories: [{
            name: "Jackets",
            link: "/kids/jackets"
        }]
    },
]

export function NavMenu() {
    return (
        <div className="cat-container">
            <div className="categories">{options.map(cat =>
                <div className="dropdown">
                    <span>{cat.name.toUpperCase()}</span>
                    <ul className="dropdown-content">
                        {cat.subcategories.map(subcat => <li><NavLink key={subcat.link} to={subcat.link}>{subcat.name}</NavLink></li>)}
                    </ul>
                </div>
            )}</div>
        </div>
    )
}
