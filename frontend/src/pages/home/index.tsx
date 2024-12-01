import { NavMenu } from "@/components/NavMenu";
import "../../collections.css";
import { LatestProducts } from "@/components/latestProducts";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="homepage">
      <NavMenu />
      <div>
        <Banner />
      </div>
      {/*  */}
      <div className="collection">
        <LatestProducts />
      </div>
    </div>
  );
}
