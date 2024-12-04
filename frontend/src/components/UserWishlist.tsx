
import { useParams } from "react-router-dom"; // Import useParams
import { Item } from "./ItemCard.tsx";
import "../ItemList.css";
import { getUserWishlist } from "@/services/api.ts";
import {
    useQuery,
} from '@tanstack/react-query'
import '../../src/style/main.scss'


export function GetUserWishlist() {
    const { userId } = useParams<{ userId: string }>();
    console.log(userId)

    const userIdNumber = userId ? parseInt(userId, 10) : NaN;
    console.log(userIdNumber + 4)


    const { data } = useQuery({
        queryKey: ['getUserWishlist', userIdNumber],
        queryFn: () => getUserWishlist(userIdNumber),
    });

    console.log(data)

    if (!userId) {
        return <div>Error: Missing User to show.</div>;
    }


    return (
        <div className="displayed-items">
            <h2 className="collection-title">Your current wishlist</h2>
            <h4 className="collection-title-paragraph">
                On Cool Fashion we have tailored personally our own collection for different models.
                <br />
                Update your style with us!
            </h4>
            <div className="collection-title-discount-paragraph" style={{justifyContent: 'center', alignItems: 'center',}}>
                <p className="discount-text">
                    30% Discount for ALL products when you buy 2 or more items. Can not be combined with other offers or discounts.
                </p>
            </div>
            <div className="collection-title-map" style={{justifyContent: 'center', alignItems: 'center',}}>
                <span className="map-item" style={{whiteSpace: 'nowrap', paddingRight: '10px', paddingLeft:'10px'}}>Your current wishlist</span>
            </div>



            <div className="item-list">
                {data?.map((wishListItem: any) => (
                    <div key={wishListItem.id} className="item-list-card">
                        <Item
                            id={wishListItem.product.id}
                            name={wishListItem.product.name}
                            price={wishListItem.product.price}
                            image={wishListItem.product.images[0]?.url ?? ""}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
