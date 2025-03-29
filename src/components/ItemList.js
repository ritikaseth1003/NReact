import { CDN } from "../utils/constants";   

const ItemList = ({ items }) => {
    console.log("items--", { items });

    return (
        <div>
            {items.map(item => (
                <div 
                    key={item.card.info.id} 
                    className="relative my-2 mx-2 flex items-center border-b-4 border-blue-200 rounded-lg p-4 shadow-md"
                >
                    {/* Image Section */}
                    <img 
                        src={CDN + item.card.info.imageId} 
                        className="w-1/4 h-1/4 rounded-lg object-cover" 
                        alt={item.card.info.name} 
                    />

                    {/* Add Button */}
                    <button 
                        className="absolute right-4 bottom-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg active:bg-blue-700"
                    >
                        Add +
                    </button>

                    {/* Content Section */}
                    <div className="ml-4 flex flex-col justify-between w-3/4">
                        <div className="text-lg font-semibold text-left">
                            {item.card.info.name} - ₹
                            {item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}
                        </div>
                        <div className="text-sm text-gray-600">
                            {item.card.info.description || "No description available"}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ItemList;
