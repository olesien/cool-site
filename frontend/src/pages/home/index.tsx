import { NavMenu } from "@/components/NavMenu";
import { ItemList } from "@/components/ItemList";
import '../../collections.css'; 
import { LatestProducts } from "@/components/latestProducts";
import { ProductsByCategoryAndSubcategory } from "@/components/categoryProducts";

export default function Home() {
    return (
        <div>
            <NavMenu />
            <div className="banner">
            </div>

            <div className="collection">
                <LatestProducts />

            </div>
            <div className="subCategoryProducts">
            <ProductsByCategoryAndSubcategory />
            </div>
            
        </div>
    );
}
