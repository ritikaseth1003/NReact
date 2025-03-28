// import { useDispatch } from "react-redux";
// import { addItem } from "../utils/cartSlice";
// import { CDN_URL } from "../utils/constants";

// const ItemList = ({ items, dummy }) => {
//   const dispatch = useDispatch();

//   const handleAddItem = (item) => {
//     // Dispatch an action
//     dispatch(addItem(item));
//   };

//   return (
//     <div>
//       {items.map((item) => (
//         <div
//           data-testid="foodItems"
//           key={item.card.info.id}
//           className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
//         >
//           <div className="w-9/12">
//             <div className="py-2">
//               <span>{item.card.info.name}</span>
//               <span>
//                 - ₹
//                 {item.card.info.price
//                   ? item.card.info.price / 100
//                   : item.card.info.defaultPrice / 100}
//               </span>
//             </div>
//             <p className="text-xs">{item.card.info.description}</p>
//           </div>
//           <div className="w-3/12 p-4">
//             <div className="absolute">
//               <button
//                 className="p-2 mx-16 rounded-lg bg-black text-white shadow-lg"
//                 onClick={() => handleAddItem(item)}
//               >
//                 Add +
//               </button>
//             </div>
//             <img src={CDN_URL + item.card.info.imageId} className="w-full" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ItemList;

import React, { useState, useEffect } from "react";

const API_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING";

const Accordion = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // Fetch data from Swiggy API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const restaurantList =
          data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setRestaurants(restaurantList);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Toggle Accordion
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Swiggy Restaurants</h2>
      {restaurants.map((restaurant, index) => (
        <div key={restaurant.info.id} className="border rounded-lg mb-2">
          <button
            className="w-full flex justify-between items-center p-3 bg-gray-200 hover:bg-gray-300"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-lg font-semibold">{restaurant.info.name}</span>
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </button>
          {openIndex === index && (
            <div className="p-3 bg-gray-100">
              <p><strong>Cuisine:</strong> {restaurant.info.cuisines.join(", ")}</p>
              <p><strong>Rating:</strong> ⭐ {restaurant.info.avgRating}</p>
              <p><strong>Delivery Time:</strong> {restaurant.info.sla.slaString}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
