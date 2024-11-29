import { useEffect, useState } from "react";
import { Item } from "./ItemCard";
import "../ItemList.css";
import { getLatestProducts } from "@/services/api.ts";

interface Product {
  id: number;
  name: string;
  price: number;
  images: { url: string }[];
}

export function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getLatestProducts();
        setProducts(data);
        setError(null);
      } catch {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="latest-products">
      <h2 className="collection-title">Latest Products</h2>
      <div className="item-list">
        {products.map((product) => (
          <div key={product.id} className="item-list-card">
            <Item
              name={product.name}
              price={product.price}
              image={product.images[0].url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
