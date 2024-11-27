import React, { useEffect, useState } from "react";
import { Product } from "../models/Product"; // Import Product model
import { getLatestProducts } from "../services/productService";

const LatestProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const latestProducts = await getLatestProducts();
        setProducts(latestProducts);
      } catch (err) {
        setError("Failed to fetch the latest products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Latest Products</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>
              Created At: {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
