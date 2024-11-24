import { NavMenu } from "@/components/NavMenu";
import { ItemList } from "@/components/ItemList";
import '../../collections.css'; 
export default function Home() {
    return (
        <div>
            <NavMenu />
            <div className="banner">

            </div>
            <div className="collection">
                <ItemList />
            </div>
        </div>
    );
}
