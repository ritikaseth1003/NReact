import React, { useState, useEffect } from "react";
import OfflineGame from "./OfflineGame";
import RestaurantCard, { withAggDiscount } from "./RestaurantCard.js";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer.js";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const RestaurantCardWithAggDiscount = withAggDiscount(RestaurantCard);

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  console.log(listOfRestaurants);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.934370681186266&lng=77.53462551778405&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  const fetchData = async () => {
    try {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
      const json = await response.json();

      const restaurantData = json?.data?.cards?.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      setListOfRestaurants(
        restaurantData?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
      );
      setFilteredRestaurants(
        restaurantData?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
      );
      setNextPageUrl(json?.data?.pageInfo?.nextPageUrl || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMoreData = async () => {
    if (!nextPageUrl) return;

    try {
      const response = await fetch(nextPageUrl);
      const json = await response.json();

      const newRestaurants = json?.data?.cards?.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setListOfRestaurants((prev) => [...prev, ...newRestaurants]);
      setNextPageUrl(json?.data?.pageInfo?.nextPageUrl || null);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  if (isOffline) {
    return <OfflineGame />;
  }

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex space-x-4 w-full md:w-auto">
          <input
            type="text"
            className="w-full md:w-64 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            placeholder="Search Restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-5 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 active:bg-orange-700 shadow-md transition-transform transform hover:scale-105"
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filtered);
            }}
          >
            🔍 Search
          </button>
        </div>

        <button
          className="px-5 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 active:bg-green-700 shadow-md transition-transform transform hover:scale-105"
          onClick={() => {
            const filtered = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            setFilteredRestaurants(filtered);
          }}
        >
          ⭐ Top Rated
        </button>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`/restaurants/${restaurant.info.id}`}
            className="transform transition duration-300 hover:scale-105"
          >
            {/* IF THE RESTAURANT HAS AN AGGREGATED DISCOUNT, SHOW IT IN THE CARD */}
            {restaurant.info.aggregatedDiscountInfoV3 ? (
              <RestaurantCardWithAggDiscount resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {nextPageUrl && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 active:bg-blue-700 shadow-md transition-transform transform hover:scale-105"
            onClick={fetchMoreData}
          >
            🔄 Load More Restaurants
          </button>
        </div>
      )}
    </div>
  );
};

export default Body;
