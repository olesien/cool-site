import { useEffect, useState } from "react";
import { Item } from "./ItemCard.tsx";
import "../ItemList.css";
import { getProductsByCategoryAndSubcategoryy } from "@/services/api.ts";
import { useParams } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    price: number;
    images: { url: string }[];
}

export function ProductsByCategoryAndSubcategory() {
    const { category, subcategory } = useParams<{ category: string, subcategory: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProductsByCategoryAndSubcategoryy(String(category), String(subcategory));
                setProducts(data);
                setError(null);
            } catch {
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, subcategory]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="displayed-items">
            <h2 className="collection-title">Products in {category} - {subcategory}</h2>
            <div className="item-list">
                {products.map((product) => (
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
    );
}
