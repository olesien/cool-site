import { Item } from "./ItemCard.tsx";
import { useParams } from 'react-router-dom';
import '../style/main.scss'
import { NavMenu } from "./NavMenu.tsx";




// Hårdkodade produktdata för olika kategorier
const itemsData: { [key: string]: Product[] } = {
    "woman-jackets": [
        { name: 'Beige Parkas', price: 1299.90, image: '/images/beige-parkas.png' },
        { name: 'Beige Coat', price: 1599.00, image: '/images/beige-coat.png' }

    ]

};

interface Product {
    name: string;
    price: number;
    image: string;
}

export function ProductsList() {
    const { category, subcategory } = useParams<{ category: string, subcategory: string }>();
    const items = itemsData[category || "woman-jackets"];
    console.log(category, subcategory);
    return (
        <div>
            <div>
                <NavMenu>

                </NavMenu>
            </div>


            <div className="collection">
                <div className="displayed-items">
                    <h2 className="collection-title">
                        {category ? `${category.replace('-', ' ').toUpperCase()}` : 'OUR COLLECTION'}
                    </h2>
                    <div className="item-list">
                        {items?.map((item, index) => (
                            <div key={index} className="item-list-card">
                                <Item
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsList