import { Link } from 'react-router-dom';

import '../itemCard.css';
interface ItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
}


export function Item({ id, name, price, image }: ItemProps) {
  if (!image) {
    image = 'https://images.pexels.com/photos/102155/pexels-photo-102155.jpeg?auto=compress&cs=tinysrgb&w=600';
  }
  return (
    <div className="item-card">
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} className="item-image" />
      </Link>
      <div className="item-details">
        <Link to={`/product/${id}`} className="item-name-link">
          <h3 className="item-name">{name}</h3>
        </Link>
        <p className="item-price">SEK {price.toFixed(2)}</p>
      </div>
    </div>
  );
}