import { Item } from "../../components/ItemCard";

import { useParams } from "react-router-dom"; // Import useParams
import "../../ItemList.css";
import { searchProducts } from "@/services/api.ts";
import { useQuery } from "@tanstack/react-query";
import { NavMenu } from "../../components/NavMenu";
import Loading from "@/components/Loading";

/* so inside frontend there is src, inside src there is pages and itemList.css together, inside pages there is search, inside search there is searchResult*/

export function SearchResult() {

    const { searchWord } = useParams<{ searchWord: string }>();

    const { data, error, isLoading } = useQuery({
        queryKey: ['search', searchWord],
        queryFn: () => searchProducts(searchWord ?? ''),
    })

    if (!searchWord) {
        return <div>We dont have the products in our catalogue yet, stay tune!.</div>;
    }

    if (error) {
        return <div><h2>Error: {error.message}</h2></div>
    }

    if (isLoading) {
        return (<div className="loading-container">
            <div><Loading /></div>
        </div>)
    }

    const capitalizedSearchWord = searchWord.charAt(0).toUpperCase() + searchWord.slice(1).toLowerCase();


    return (
        <div>
            <NavMenu />
            <div className="latest-products">
                <h2 className="collection-title" style={{ marginTop: '60px' }}>Search result for "{capitalizedSearchWord}"</h2>
                <div className="item-list" style={{ marginTop: '40px' }}>
                    {data && data.length === 0 ? (
                        <h3>No products found with the given search</h3>
                    ) :
                        (data?.map((product) => (
                            <div key={product.id} className="item-list-card">
                                <Item
                                    name={product.name}
                                    price={product.price}
                                    image={product.images[0]?.url ?? ""}
                                />
                            </div>
                        ))
                        )}
                </div>
            </div>
        </div>
    );
}