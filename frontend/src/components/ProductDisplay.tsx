import React from 'react';
import { Product } from './types';
import { Carousel, Button, Image } from 'antd';
import { useState } from 'react';
interface ProductDisplayProps {
    product: Product;
}

export function ProductDisplay({ product }: ProductDisplayProps) {
    const [mainImage, setMainImage] = useState<string>(product.images[0]?.url || '');

  // Handle thumbnail click to change main image
  const handleThumbnailClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

    return (
        <div className="product-container">
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
                    <div className="main-image-container">
                        <Image
                            width={400}
                            height={400}
                            src={mainImage} alt={product.name}
                            className="main-image-product"
                        />
                    </div>
                    
                    <div className="thumbnail-carousel">
                        <Carousel
                        arrows
                        dotPosition="left"
                        infinite={false}
                        slidesToShow={5}
                        >
                        {product.images.map((image: { id: number; url: string; name: string }) => (
                            <div key={image.id} className="carousel-image-thumbnail">
                            <img
                                src={image.url}
                                alt={image.name}
                                onClick={() => handleThumbnailClick(image.url)}
                            />
                            </div>
                        ))}
                        </Carousel>
                    </div>
                </div>


                
            </div>
        </div>
    );
}