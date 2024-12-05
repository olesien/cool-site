import { NavMenu } from "@/components/NavMenu";
import { getChosenProduct } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Item } from "@/components/ItemCard";
import { ProductDisplay } from "@/components/ProductDisplay";

export default function ProductView() {
    const { productId } = useParams<{ productId: string }>();
    const productIdNumber = parseInt(String(productId), 10);
    let errorMessage: string | null = null;

    const { data: product, error, isLoading } = useQuery({
        queryKey: ['chosen-product', productIdNumber],
        queryFn: () => getChosenProduct(productIdNumber),
        enabled: !isNaN(productIdNumber)
    });

    if (isNaN(productIdNumber)) {
        errorMessage = "Invalid product ID.";
    } else if (isLoading) {
        errorMessage = "Loading...";
    } else if (error) {
        errorMessage = error?.message || "An unknown error occurred.";
    } else if (!product) {
        errorMessage = "No product found.";
    }

    if(!product) {
        return (<div></div>)
    }
    return (
        <div>
        <NavMenu />
        {errorMessage ? (
                <h3 className="error-text">{errorMessage}</h3>
            ) : (
                <ProductDisplay product={product} />
            )}
    </div>
    );
}