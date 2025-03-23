
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
    const { resId } = useParams(); // Get restaurant ID from URL
    const resInfo=useRestaurantMenu(resId);  //custom hook.
    
//RestaurantMenu component does not have to worry about how to get the data it has a single responsibility to display the data it got.



    if (!resInfo) return <Shimmer />;

    const menuInfo = resInfo?.cards?.find(
        (card) => card?.card?.card?.info
    )?.card?.card?.info;

    if (!menuInfo) {
        return <h1>Menu data not available</h1>;
    }

    const { name, cuisines, costForTwoMessage } = menuInfo;

    // Extracting `itemCards` properly
    const itemCards =
        resInfo?.cards
            ?.find(card => card?.groupedCard?.cardGroupMap?.REGULAR)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards
            ?.flatMap(card => card?.card?.card?.itemCards || []) || [];

    console.log("Extracted Menu Items:", itemCards);

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines?.join(", ") || "No cuisines available"} - {costForTwoMessage || "N/A"}</p>

            <ul>
                {itemCards.map((item) => (
                    <li key={item?.card?.info?.id}>
                        {item?.card?.info?.name} - Rs. {item?.card?.info?.price / 100}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantMenu;