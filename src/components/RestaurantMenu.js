import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
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

    // Extract categories
    const categories = resInfo.cards
        .filter(card => card?.groupedCard?.cardGroupMap?.REGULAR?.cards)
        .flatMap(card => card.groupedCard.cardGroupMap.REGULAR.cards)
        .filter(item => item.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
        .map(item => ({
            title: item.card.card.title,
            categoryId: item.card.card.categoryId, // Ensure categoryId exists
            itemCards: item.card.card.itemCards || [] // Store items within category
        }));

    // console.log("categories: ", categories);

    return (
        <div className="flex flex-col flex-wrap items-center text-center justify-center">
            <h1 className="text-3xl text-blue-800 my-5 mx-2 text-2xl p-3 font-bold">{name}</h1>
            <p className="mx-2 text-xl font-bold text-lg">{cuisines?.join(", ") || "No cuisines available"} - {costForTwoMessage}</p>
        {/* categories accordian-header and collapsable body. */}
        {categories.map((category)=>(
    <RestaurantCategory key={category?.name} data={category} />
    
))}

            {/* <ul>
                {categories.map((category) => (
                    <li key={category.categoryId} className="my-5 mx-2">
                        <h2 className="text-2xl flex items-center justify-center font-extrabold text-blue-800">{category.title} - ({category.itemCards.length} items)</h2>
                        <ul>
                            {
                                category.itemCards.map((item) => (
                            
                                    <li key={item.card.info.id} className="my-2 mx-2 flex flex-col border-2 border-blue-200 rounded-lg p-4 shadow-md">
                                        <h3 className="text-xl text-blue-600">{item.card.info.name} - Rs. {item.card.info.defaultPrice ? item.card.info.defaultPrice / 100 : "N/A"}</h3>
                                        <p className="font-bold">{item.card.info.description || "No description available"}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default RestaurantMenu;
