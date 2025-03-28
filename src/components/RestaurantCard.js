import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla,aggregatedDiscountInfoV3} = resData?.info;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 relative h-[350px] flex flex-col">
      {/* Discount Label (Ensuring visibility inside the card) */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-white font-bold text-sm px-3 py-1 rounded-md shadow-md z-10">
        🔥  {aggregatedDiscountInfoV3?.header} {aggregatedDiscountInfoV3?.subHeader}
      </div>

      {/* Image Section */}
      <div className="relative">
        <img
          className="w-full h-44 object-cover rounded-xl"
          src={`${CDN_URL}/${cloudinaryImageId || "default_image_id"}`}
          alt="Restaurant"
        />
      </div>

      {/* Restaurant Info */}
      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 truncate">{name}</h3>
        <h4 className="text-sm text-gray-600 truncate">{cuisines.join(", ")}</h4>

        <div className="flex items-center justify-between mt-2">
          <span className="text-green-600 font-semibold flex items-center">
            ⭐ {avgRating}
          </span>
          <span className="text-gray-700 font-medium">{costForTwo}</span>
        </div>

        <p className="text-gray-500 text-sm mt-1">⏳ {sla.deliveryTime} mins</p>
      </div>
    </div>
  );
};

// 🔥 HIGHER ORDER COMPONENT (HOC) for Discount Label
export const withAggDiscount = (RestaurantCard) => {
  return (props) => (
    <div className="relative">
      <RestaurantCard {...props} />
    </div>
  );
};

export default RestaurantCard;
