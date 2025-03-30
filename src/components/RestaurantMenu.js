import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import {useState} from "react";
const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(-1); // State to manage which category is expanded
    // Debugging API response
    console.log("API Response:", resInfo);

    if (!resInfo) return <Shimmer />;

    // Find the menu info dynamically
    const menuInfo = resInfo?.cards?.find(card => card?.card?.card?.info)?.card?.card?.info || {};

    // Destructure safely with defaults
    const { name = "Unknown Restaurant", cuisines = [], costForTwoMessage = "N/A" } = menuInfo;

    // Extract categories

    const categories = resInfo.cards
        .filter(card => card?.groupedCard?.cardGroupMap?.REGULAR?.cards)
        .flatMap(card => card.groupedCard.cardGroupMap.REGULAR.cards)
        .filter(item => item.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
        .map(item => ({
            title: item.card.card.title,
            categoryId: item.card.card.categoryId || item.card.card.title, // Ensure a unique key
            itemCards: item.card.card.itemCards || [] // Store items within category
        }));

    // console.log("categories: ", categories);

    return (
        <div className="flex flex-col flex-wrap items-center text-center justify-center">
            <h1 className="text-3xl text-blue-800 my-5 mx-2 text-2xl p-3 font-bold">{name}</h1>
            <p className="mx-2 text-xl font-bold text-lg">{cuisines?.join(", ") || "No cuisines available"} - {costForTwoMessage}</p>
        
            {/* Categories Accordion Header and Collapsible Body */}
            {categories.map((category,index) => (
                //controlled component.
                <RestaurantCategory key={category.categoryId} data={category}
                showItems={index==showIndex ? true:false}  // Pass showItems as false to avoid initial rendering of items
                setShowIndex={()=>{
                    setShowIndex(index); // Update the index of the currently expanded category

                }}
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;
