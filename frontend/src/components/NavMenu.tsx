import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { Fragment, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/api";
import Loading from "./Loading";

export function NavMenu() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCats, setShowCats] = useState<{ [key: string]: boolean }>({});
    const isMobile = useIsMobile();
    const { data } = useQuery({
        queryKey: ['cats'],
        queryFn: getCategories,
    })
    if (!data) {
        return <Loading />
    }
    const options = data?.categories;
    return (
        <div className="cat-container">
            {!isMobile && (
                <div className="desktop-categories">
                    {options?.map((cat) => (
                        <div className="dropdown" key={cat.id}>
                            <span>{cat.name.toUpperCase()}</span>
                            <ul className="dropdown-content">
                                {cat?.sub_categories?.map((subcat) => (
                                    <li>
                                        <NavLink key={subcat.link_name} to={cat.link_name + "/" + subcat.link_name}>
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
                                    <Fragment key={cat.id}>
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
                                                {cat.sub_categories.map((subcat) => (
                                                    <li className="subcatlink">
                                                        <NavLink key={subcat.link_name} to={cat.link_name + "/" + subcat.link_name}>
                                                            {subcat.name}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
