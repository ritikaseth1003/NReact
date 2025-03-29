import {useState} from "react"; 
import ItemList from "./ItemList";
const RestaurantCategory = ({ data }) => {
  // console.log(data);

  const [showItems,setShowItems] = useState(false);
  const handleClick = () => {
    // Logic to toggle the visibility of the item list  
    setShowItems(!showItems);

  }

  return (
    <div>
        <div className="w-[1000] my-4 shadow-2xl bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition duration-200 ">
      {/* Header */}
      <div className="flex justify-between items-center"onClick={handleClick}>
        <span className="font-bold text-lg">{data.title}-({data.itemCards.length})</span>
        <span className="text-xl transition-transform duration-300">⬇️</span>
     </div>
              {/* Accordian Body */}
      {showItems && <ItemList items={data.itemCards} />}
     
      </div>

    </div>
  );
};

export default RestaurantCategory;
