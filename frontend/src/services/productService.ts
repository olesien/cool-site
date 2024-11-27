import axios from "axios";
import { Product } from "../models/Product";

const API_BASE_URL = "http://localhost:8080/users";

export const getLatestProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    `${API_BASE_URL}/latest-products`,
    {
      withCredentials: true, // Include cookies if needed
    }
  );
  return response.data;
};
