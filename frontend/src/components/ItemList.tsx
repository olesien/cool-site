
import { Item } from "./ItemCard.tsx";
import '../ItemList.css';

// Define the product type
interface Item {
    name: string;
    price: number;
    image: string;
}

// Hardcoded product data
const items: Item[] = [
    { name: 'Brown Cardigan', price: 499.90, image: '/images/02142133700-e1-removebg-preview.png' },
    { name: 'Beige Cardigan', price: 590.00, image: '/images/05755123081-e1-removebg-preview.png' },
    { name: 'Stylish Cardigan', price: 890.90, image: '/images/09598128401-e1-removebg-preview.png' },
    { name: 'Gray Cardigan', price: 350.90, image: '/images/06771102832-e1-removebg-preview.png' },
];


export function ItemList() {
    return (
        <div className="displayed-items">
            <h2 className="collection-title">Our Collection</h2>
            <div className="item-list">
                {items.map((item, index) => (
                    <div key={index} className="item-list-card">
                        <Item
                            key={index}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            id={
                                index
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
