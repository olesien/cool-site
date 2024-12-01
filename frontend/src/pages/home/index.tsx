import { NavMenu } from "@/components/NavMenu";
import '../../collections.css';
import { LatestProducts } from "@/components/latestProducts";
import { FooterAndLogos } from "@/components/footer";

export default function Home() {
    return (
        <div>
            <NavMenu />
            <div className="banner">
            </div>

            <div className="collection">
                <LatestProducts />
            </div>

        </div>
    );
}
