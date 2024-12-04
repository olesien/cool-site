import { Item } from "./ItemCard";
import "../ItemList.css";
import { getLatestProducts } from "@/services/api.ts";
import { useQuery } from "@tanstack/react-query";

export function LatestProducts() {
    const { data: products, error } = useQuery({
        queryKey: ['latest-products'],
        queryFn: getLatestProducts,
    })

    if (!products) {
        return <p className="loading-text">Loading...</p>;
    }

    if (error) {
        return <p className="error-text">{error.message}</p>;
    }

    return (
        <div className="latest-products">
            <h2 className="collection-title">Latest Products</h2>
            <div className="item-list">
                {products.map((product) => (
                    <div key={product.id} className="item-list-card">
                        <Item
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.images[0]?.url ?? ""}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
