import React, { useState, useEffect } from 'react';
import OfflineGame from './OfflineGame'; // Assuming this is in the same folder
import RestaurantCard from "./RestaurantCard.js";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer.js";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine); // State to track network status

  // Effect to handle online/offline status changes
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners when the component is unmounted
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetching data from API
  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.934370681186266&lng=77.53462551778405&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  const fetchData = async () => {
    try {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
      const json = await response.json();

      const restaurantData = json?.data?.cards?.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      setListOfRestaurants(restaurantData?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
      setFilteredRestaurants(restaurantData?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
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

      setListOfRestaurants((prevRestaurants) => [...prevRestaurants, ...newRestaurants]);
      setNextPageUrl(json?.data?.pageInfo?.nextPageUrl || null);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const onlineStatus = useOnlineStatus(); // Custom hook

  if (isOffline) {
    return <OfflineGame />; // Show the game when offline
  }

  // Show Shimmer when data is loading
  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              const filteredRestaurants = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter((res) => res.info.avgRating > 4.5);
            setFilteredRestaurants(filteredList); // Update filteredRestaurants instead
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>

      {nextPageUrl && (
        <button className="load-more-btn" onClick={fetchMoreData}>
          Load More Restaurants
        </button>
      )}
    </div>
  );
};

export default Body;
