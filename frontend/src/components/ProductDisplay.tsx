import React from 'react';
import { Button } from 'antd';
import { useAppContext } from "@/contexts/useAppContext";

// the ./types wouldnt refer correctly for some reason so now making mock of the Product interface for test
interface Product {
    id: number;
    name: string;
    price: number;
    images: { id: number, url: string, name: string }[];
    quantity: number;
}
interface ProductDisplayProps {
    product: Product;
}

import axios from "axios";
import { base_url } from '@/services/api';
import { toast } from "react-toastify";


export function ProductDisplay({ product }: ProductDisplayProps) {
    const { user } = useAppContext();


    const onAddToWishlist = async (productId: number) => {
        console.log("user id is: " + user?.user_role)
        if (user?.user_role == null){
            alert("Please continue to log in to put this product into Your WishList")
        }
        if (user?.user_role === 0) {
            alert("You're an admin.")
        } else if (user?.user_role === 1) {
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
                alert('This product is now in Your Wishlist')

            } catch (err: unknown) {
                console.error(err);
                if (axios.isAxiosError(err)) {
                    if (err.response?.data) {
                        toast.error(String(err.response?.data));
                    } else {
                        toast.error(err.message);
                    }
                } else {
                    toast.error("Something went wrong")
                }
            }
        }
    }

    return (
        <div className="product-display">
            <h1 className="product-title">{product.name}</h1>
            <div>
                <div >
                    <p>SEK {product.price.toFixed(2)}</p>
                    <p>Available Quantity: {product.quantity}</p>
                    <Button onClick={() => onAddToWishlist(product.id)}>
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
