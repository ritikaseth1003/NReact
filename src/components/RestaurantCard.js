import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData?.info;

  return (
    <div className="bg-gray-200 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <img
        className="w-full h-63 object-cover rounded-xl"
        src={`${CDN_URL}/${cloudinaryImageId || "default_image_id"}`}
        alt="Restaurant"
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
        <h4 className="text-sm text-gray-600 truncate">{cuisines.join(", ")}</h4>
        <div className="flex items-center justify-between mt-2">
          <span className="text-yellow-500 font-semibold">⭐ {avgRating}</span>
          <span className="text-gray-700 font-medium">{costForTwo}</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">⏳ {sla.deliveryTime} mins</p>
      </div>
    </div>
  );
};

//HIGHER ORDER COMPONENT.
//input--RestaurantCard=>Restaurant Casd with aggregated discount.
export const withAggDiscount=(RestaurantCard)=>{
return ()=>{
  return (
    <div>
      <label>Aggregated Discount</label>
      <RestaurantCard/>
    </div>
  )
}
}



export default RestaurantCard;