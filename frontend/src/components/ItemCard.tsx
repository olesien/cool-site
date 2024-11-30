
interface ItemProps {
  name: string;
  price: number;
  image: string;
}


export function Item({ name, price, image }: ItemProps) {
  return (
    <div
      className="item-card"
    >
      <img src={image} alt={name} className="item-image" />
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <p className="item-price">SEK {price.toFixed(2)}</p>
      </div>
    </div>
  );
}