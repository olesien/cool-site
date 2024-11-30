import { NavMenu } from "@/components/NavMenu";
import { ProductsByCategoryAndSubcategory } from "@/components/categoryProducts";
export default function Categories() {
    return (
        <div>
            <NavMenu />
            <div className="collection">
                <ProductsByCategoryAndSubcategory />
            </div>
        </div>
    );
}
