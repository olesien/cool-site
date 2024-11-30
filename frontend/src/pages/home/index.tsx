import { NavMenu } from "@/components/NavMenu";
import { LatestProducts } from "@/components/latestProducts";
import { ItemList } from "@/components/ItemList";
import { Banner } from "@/components/banner";

export default function Home() {
    return (
        <div>
            <NavMenu />
            <Banner />
            <div className="collection">
                <LatestProducts />
            </div>
            <div className="collection">
                <ItemList />
            </div>

        </div>
    );
}
