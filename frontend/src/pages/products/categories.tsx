import { NavMenu } from "@/components/NavMenu";
import { ProductsByCategoryAndSubcategory } from "@/components/categoryProducts";
import '../../collections.css'; 
export default function WomanJackets() {
    return (
        <div>
            <NavMenu />
            <div className="banner">

            </div>
            <div className="collection">
                <ProductsByCategoryAndSubcategory />
            </div>
        </div>
    );
}
