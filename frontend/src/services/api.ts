import { Category } from "@/pages/admin/categories";
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

export const getProducts = async () => {
    // const response = await axios.get<{categories: Product[]}>(
    //     base_url + '/products',
    //     {
    //         headers: {
    //             "Access-Control-Allow-Origin": "*"
    //         },
    //         withCredentials: true
    //     }
    // )
    // return response.data;
    const data: Product[] = [
        {
            id: 1,
            name: "Brown Cardigan",
            price: 499.90,
            product_images: [],
            sub_categories_id: 11,
            sub_categories: {
                id: 11, categories_id: 2, name: "Jackets", link_name: "jackets", category: {
                    id: 2,
                    name: "Man",
                    link_name: "men",
                }
            }
        },
        {
            id: 2,
            name: "Beige Cardigan",
            price: 90.00,
            product_images: [],
            sub_categories_id: 11,
            sub_categories: {
                id: 11, categories_id: 2, name: "Jackets", link_name: "jackets", category: {
                    id: 2,
                    name: "Man",
                    link_name: "men",
                }
            }
        },
        {
            id: 3,
            name: "Stylish Cardigan",
            price: 900.00,
            product_images: [],
            sub_categories_id: 2,
            sub_categories: {
                id: 11, categories_id: 2, name: "Jackets", link_name: "jackets", category: {
                    id: 11,
                    name: "Man",
                    link_name: "men",
                }
            }
        }
    ]; return { products: data };
}

