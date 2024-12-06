
import { useParams } from "react-router-dom"; // Import useParams
import { Item } from "./ItemCard.tsx";
import "../ItemList.css";
import { getProductsByCategoryAndSubcategoryy } from "@/services/api.ts";
import {
    useQuery,
} from '@tanstack/react-query'
import '../style/main.scss'
import { useState } from "react";
import { Input } from "antd";

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    images: { url: string }[];
}


export function ProductsByCategoryAndSubcategory() {
    const { category, subcategory } = useParams<{ category: string; subcategory: string }>();


    const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const capitalizedCategory = capitalizeFirst(String(category));
    const capitalizedSubcategory = capitalizeFirst(String(subcategory));

    const { data } = useQuery({
        queryKey: ['productsBySubCategory', category, subcategory],
        queryFn: () => getProductsByCategoryAndSubcategoryy(String(category), String(subcategory)),
    });

    const [serachTerm, setSearchTerm] = useState<string>('')

    // Validate that category and subcategory exist, somehow without this the queryFn wouldnt work
    if (!category || !subcategory) {
        return <div>Error: Missing category or subcategory.</div>;
    }

    const filteredProducts = data?.filter((product: Product) =>
        product.name.toLowerCase().includes(serachTerm.toLowerCase())
    )

    return (
        <div className="displayed-items">
            <h2 className="collection-title">{capitalizedCategory} for {capitalizedSubcategory}</h2>
            <h4 className="collection-title-paragraph">
                On Cool Fashion we have tailored personally our own collection for different models.
                <br />
                Update your style with us!
            </h4>
            <div className="collection-title-discount-paragraph">
                <p className="discount-text">
                    30% Discount for ALL products when you buy 2 or more items. Can not be combined with other offers or discounts.
                </p>
            </div>
            <div className="collection-title-map">

                <span className="map-item">{capitalizedCategory}</span>
                <span className="map-divider">/</span>
                <span className="map-item" style={{ whiteSpace: 'nowrap', paddingRight: '10px', paddingLeft: '10px' }}>{capitalizedSubcategory}</span>

                <Input
                    placeholder="Search in this category..."
                    value={serachTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>


            <div className="item-list">
                {filteredProducts?.map((product: any) => (
                    <div key={product.id} className="item-list-card">
                        <Item
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.images[0]?.url ?? ""}
                            quantity={product.quantity}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
