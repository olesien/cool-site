import React from 'react';
import { Button } from 'antd';
import { useAppContext } from "@/contexts/useAppContext";

// the ./types wouldnt refer correctly for some reason so now making mock of the Product interface for test

interface ProductDisplayProps {
    product: Product;
    refetch: () => void;
}

import axios from "axios";
import { base_url } from '@/services/api';
import { toast } from "react-toastify";
import { Product } from '@/pages/admin/products';


export function ProductDisplay({ product, refetch}: ProductDisplayProps) {
    const { user } = useAppContext();


    const onAddToWishlist = async (productId: number) => {
        if (!user) {
            alert("Please continue to log in to put this product into Your WishList")
        }
        try {
            const response = await axios.post<string>(
                base_url + '/products/addToWishlist',
                { productId },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true,
                });
            toast.success(response.data);
            refetch()
            alert('This product is now in Your Wishlist')

        } catch (err: unknown) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                if (err.response?.data) {
                    console.log(err.response?.data);
                    toast.error(String(err.response?.data));
                } else {
                    toast.error(err.message);
                }
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    const removeFromWishlist = async (productId: number) => {
      
        try {
            const response = await axios.delete<string>(
                base_url + '/wishlist/remove/' + productId,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true,
                });
            toast.success(response.data);
            refetch()

        } catch (err: unknown) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                if (err.response?.data) {
                    console.log(err.response?.data);
                    toast.error(String(err.response?.data));
                } else {
                    toast.error(err.message);
                }
            } else {
                toast.error("Something went wrong")
            }
        }
    }
    const wishlist=user && product.wishlist.length > 0 ? product.wishlist[0] : null

    return (
        <div className="product-display">
            <h1 className="product-title">{product.name}</h1>
            <div>
                <div >
                    <p>SEK {product.price.toFixed(2)}</p>
                    <p>Available Quantity: {product.quantity}</p>
                    {!!user && (wishlist ? <Button onClick={() => removeFromWishlist(wishlist.id)}>
                        Remove from Wishlist
                    </Button> : <Button onClick={() => onAddToWishlist(product.id)}>
                        Add to Wishlist
                    </Button>)
                    }
                    
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
