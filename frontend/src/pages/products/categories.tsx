import { NavMenu } from "@/components/NavMenu";
import { ProductsByCategoryAndSubcategory } from "@/components/categoryProducts";
import "../../collections.css";
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
