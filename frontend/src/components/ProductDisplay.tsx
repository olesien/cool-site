import React from 'react';
import { Product } from './types';
import { Button } from 'antd';
interface ProductDisplayProps {
    product: Product; 
    onAddToWishlist: (productId: number) => void;
}

export function ProductDisplay({ product }: ProductDisplayProps) {

    return (
        <div className="product-display">
            <h1 className="product-title">{product.name}</h1>
            <div>
                <div >
                    <p>SEK {product.price.toFixed(2)}</p>
                    <p>Available Quantity: {product.quantity}</p>
                    <Button>
                        Add to Wishlist
                    </Button>
                </div>
                <div className="product-images">
                    <img src={product.images[0]?.url} alt={product.name} className="main-product-image" />
                    <div>
                        {product.images.slice(1).map((image) => (
                            <img
                                key={image.id}
                                src={image.url}
                                alt={image.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}