import { useParams } from "react-router-dom"; // Import useParams
import { Item } from "./ItemCard.tsx";
import { getProductsByCategoryAndSubcategoryy } from "@/services/api.ts";
import {
    useQuery,
} from '@tanstack/react-query'

interface Product {
    id: number;
    name: string;
    price: number;
    images: { url: string }[];
}

export function ProductsByCategoryAndSubcategory() {
    const { category, subcategory } = useParams<{ category: string; subcategory: string }>();

    const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
    const capitalizedCategory = capitalizeFirst(String(category)).replace('-', ' ');
    const capitalizedSubcategory = capitalizeFirst(String(subcategory)).replace('-', ' ');

    const { data } = useQuery({
        queryKey: ['productsBySubCategory', category, subcategory],
        queryFn: () => getProductsByCategoryAndSubcategoryy(String(category), String(subcategory)),
    });

    // Validate that category and subcategory exist, somehow without this the queryFn wouldnt work
    if (!category || !subcategory) {
        return <div>Error: Missing category or subcategory.</div>;
    }

    return (
        <div className="displayed-items">
            <h2 className="collection-title">{capitalizedCategory} - {capitalizedSubcategory}</h2>
            <div className="item-list">
                {data?.map((product: Product) => (
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
