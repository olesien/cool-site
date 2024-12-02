import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { Fragment, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/services/api";
import Loading from "./Loading";
import { Input } from "antd";


interface Product {
    id: number;
    name: string;
    price: number;
    images: { url: string }[];
}

export function NavMenu() {


    const [showDropdown, setShowDropdown] = useState(false);
    const [showCats, setShowCats] = useState<{ [key: string]: boolean }>({});
    const isMobile = useIsMobile();
    const { data } = useQuery({
        queryKey: ["cats"],
        queryFn: getCategories,
    });

    const { data: allProducts } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredProducts = allProducts?.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (!data) {
        return <Loading />;
    }
    const options = data;
    return (
        <div className="cat-container">
            {!isMobile && (
                <div className="desktop-categories">
                    {options?.map((cat) => (
                        <div className="dropdown" key={cat.id}>
                            <span>{cat.name.toUpperCase()}</span>
                            <ul className="dropdown-content">
                                {cat?.sub_categories?.map((subcat) => (
                                    <li key={subcat.id}>
                                        <NavLink
                                            key={subcat.link_name}
                                            to={
                                                "/" +
                                                cat.link_name +
                                                "/" +
                                                subcat.link_name
                                            }
                                        >
                                            {subcat.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="searchBoxInNav">
                        <Input
                            placeholder="Search catalogues"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <div className="searchResultInNav">
                                {filteredProducts?.length ? (filteredProducts.map((product: Product) => (
                                    <div className="searchResultItemInNav" key={product.id}>
                                        <img src={product.images[0]?.url} alt={product.name} />
                                        <div>
                                            <div className="searchResultItemProductNameInNav">
                                                {product.name}
                                            </div>
                                            <div className="searchResultItemProductPriceInNav">
                                                {product.price}
                                            </div>
                                        </div>
                                    </div>
                                ))) : (
                                    <div className="searchResultNoProductsFound">
                                        No products in our catalogue
                                    </div>
                                )
                                }
                            </div>
                        )}
                    </div>
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
                                                    [cat.name]:
                                                        !oldCats[cat.name],
                                                }))
                                            }
                                        >
                                            {cat.name.toUpperCase()}
                                        </li>
                                        {showCats[cat.name] && (
                                            <>
                                                {cat.sub_categories.map(
                                                    (subcat) => (
                                                        <li className="subcatlink">
                                                            <NavLink
                                                                key={
                                                                    subcat.link_name
                                                                }
                                                                to={
                                                                    "/" +
                                                                    cat.link_name +
                                                                    "/" +
                                                                    subcat.link_name
                                                                }
                                                            >
                                                                {subcat.name}
                                                            </NavLink>
                                                        </li>
                                                    )
                                                )}
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
