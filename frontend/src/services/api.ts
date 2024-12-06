
import { Category } from "@/pages/admin/categories";
import { ContactForm } from "@/pages/admin/contactform";
import { Product } from "@/pages/admin/products";
import axios from "axios";
export const base_url = "http://localhost:8080";

export const getPing = async () => {
    const response = await axios.get<string>(
        base_url + '/users/ping',
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    return response.data;
}

export const getCategories = async () => {
    const response = await axios.get<Category[]>(
        base_url + '/categories/all',
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    return response.data;
}


export const getProductsByCategoryAndSubcategoryy = async (category: string, subcategory: string) => {
    const response = await axios.get<Product[]>(
        `${base_url}/products/${category}/${subcategory}`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    console.log(response.data);
    return response.data;
}

export const searchProducts = async (searchWord: string) => {
    const response = await axios.get<Product[]>(
        `${base_url}/products/search/${searchWord}`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    console.log(response.data);
    return response.data;
}

export const getUserWishlist = async (userId: number) => {
    const response = await axios.get<Product[]>(
        `${base_url}/wishlist/${userId}`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    console.log(response.data);
    return response.data;
}

export const getProductWishlist = async (productId: number) => {
    const response = await axios.get<{ id: number } | null>(
        `${base_url}/wishlist/product/${productId}`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    console.log(response.data);
    return response.data;
}

export const getProducts = async () => {
    const response = await axios.get<Product[]>(
        base_url + '/products/all',
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    return response.data;
}

export const getAllContactForms = async () => {
    const response = await axios.get<ContactForm[]>(
        base_url + '/message/all',
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    return response.data;
}



export const getLatestProducts = async () => {
    const response = await axios.get<Product[]>(
        base_url + '/products/latest',
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    return response.data;
}

export const getFilteredProducts = async (quantity: number) => {
    const response = await axios.get<Product[]>(
        `${base_url}/products/filter?maxQuantity=${quantity}`, // Correct query parameter name
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    );
    return response.data;
};

export const getChosenProduct = async (productId: number) => {
    const response = await axios.get<Product>(
        `${base_url}/products/${productId}`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    console.log(response.data);
    return response.data;
}

export const getProductsAddedByAdmin = async (userId: number) => {
    const response = await axios.get<Product[]>(
        `${base_url}/products/my-products/${userId}`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }
    )
    console.log(response.data);
    return response.data;
}