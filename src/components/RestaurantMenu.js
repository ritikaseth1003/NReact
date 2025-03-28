import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    // Debugging API response
    console.log("API Response:", resInfo);

    if (!resInfo) return <Shimmer />;

    // Find the menu info dynamically
    const menuInfo = resInfo?.cards?.find(card => card?.card?.card?.info)?.card?.card?.info || {};

    // Destructure safely with defaults
    const { name = "Unknown Restaurant", cuisines = [], costForTwoMessage = "N/A" } = menuInfo;

    // Extract itemCards
    const itemCards =
        resInfo?.cards
            ?.find(card => card?.groupedCard?.cardGroupMap?.REGULAR)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards
            ?.flatMap(card => card?.card?.card?.itemCards || []) || [];

    console.log("Extracted Menu Items:", itemCards);

    // Extract categories
    const categories = resInfo.cards
    .filter(card => card?.groupedCard?.cardGroupMap?.REGULAR?.cards)
    .flatMap(card => card.groupedCard.cardGroupMap.REGULAR.cards)
    .filter(item => item.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
    .map(item => ({
        title: item.card.card.title,
        categoryId: item.card.card.categoryId,
        image: item.card.card.image,
        items: item.card.card.itemCards ? item.card.card.itemCards.length : 0
    }));

console.log("categories: ", categories);
    console.log("Categories:", categories);
    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines?.join(", ") || "No cuisines available"} - {costForTwoMessage}</p>

            <ul>
                {itemCards.length > 0 ? (
                    itemCards.map((item) => (
                        <li key={item?.card?.info?.id}>
                            {item?.card?.info?.name} - Rs. {item?.card?.info?.price / 100}
                        </li>
                    ))
                ) : (
                    <p>No menu items available</p>
                )}
            </ul>
        </div>
    );
};

export default RestaurantMenu;
