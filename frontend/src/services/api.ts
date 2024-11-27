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
    // const response = await axios.get<{categories: Category[]}>(
    //     base_url + '/categories',
    //     {
    //         headers: {
    //             "Access-Control-Allow-Origin": "*"
    //         },
    //         withCredentials: true
    //     }
    // )
    // return response.data;
    const data: Category[] = [
        {
            id: 1,
            name: "Woman",
            link_name: "women",
            sub_categories: [
                { id: 1, categories_id: 1, name: "Jackets", link_name: "jackets" },
                { id: 2, categories_id: 1, name: "Party", link_name: "party" },
                { id: 3, categories_id: 1, name: "Tops", link_name: "tops" },
                { id: 4, categories_id: 1, name: "Dresses", link_name: "dresses" },
                { id: 5, categories_id: 1, name: "Outerwear", link_name: "outerwear" },
                { id: 6, categories_id: 1, name: "Jeans & Pants", link_name: "jeans-pants" },
                { id: 7, categories_id: 1, name: "Skirts & Shorts", link_name: "skirts-shorts" },
                { id: 8, categories_id: 1, name: "Sweaters & Cardigans", link_name: "sweaters-cardigans" },
                { id: 9, categories_id: 1, name: "Blazers", link_name: "blazers" },
                { id: 10, categories_id: 1, name: "Sale", link_name: "sale" }
            ]
        },
        {
            id: 2,
            name: "Man",
            link_name: "men",
            sub_categories: [
                { id: 11, categories_id: 2, name: "Jackets", link_name: "jackets" },
                { id: 12, categories_id: 2, name: "T-Shirts", link_name: "t-shirts" },
                { id: 13, categories_id: 2, name: "Hoodies & Sweatshirts", link_name: "hoodies" },
                { id: 14, categories_id: 2, name: "Pants & Jeans", link_name: "pants-jeans" },
                { id: 15, categories_id: 2, name: "Shorts", link_name: "shorts" },
                { id: 16, categories_id: 2, name: "Sweaters & Knitwear", link_name: "sweaters-knitwear" },
                { id: 17, categories_id: 2, name: "Vests & Tank Tops", link_name: "vests-tank-tops" },
                { id: 18, categories_id: 2, name: "Sale", link_name: "sale" }
            ]
        },
        {
            id: 3,
            name: "Kids",
            link_name: "kids",
            sub_categories: [
                { id: 19, categories_id: 3, name: "Jackets", link_name: "jackets" },
                { id: 20, categories_id: 3, name: "T-Shirts", link_name: "t-shirts" },
                { id: 21, categories_id: 3, name: "Hoodies & Sweatshirts", link_name: "hoodies" },
                { id: 22, categories_id: 3, name: "Pants & Jeans", link_name: "pants-jeans" },
                { id: 23, categories_id: 3, name: "Shorts", link_name: "shorts" },
                { id: 24, categories_id: 3, name: "Sale", link_name: "sale" }
            ]
        }
    ]; return { categories: data };
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
    ]; return { categories: data };
}

