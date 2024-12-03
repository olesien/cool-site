import { Item } from "./ItemCard";

import { useParams } from "react-router-dom"; // Import useParams
import "../ItemList.css";
import { getLatestProducts, searchProducts } from "@/services/api.ts";
import { useQuery } from "@tanstack/react-query";
import { NavMenu } from "./NavMenu";



export function SearchResult() {

    const { searchWord } = useParams<{ searchWord: string }>();

    if (!searchWord) {
        return <div>We dont have the products in our catalogue yet, stay tune!.</div>;
    }

    const { data } = useQuery({
        queryKey: ['search', searchWord],
        queryFn: () => searchProducts(searchWord),
    })


    return (
        <div>
            <NavMenu />
            <div className="latest-products">
                <h2 className="collection-title">Latest Products</h2>
                <div className="item-list">
                    {data?.map((product) => (
                        <div key={product.id} className="item-list-card">
                            <Item
                                name={product.name}
                                price={product.price}
                                image={product.images[0]?.url ?? ""}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}