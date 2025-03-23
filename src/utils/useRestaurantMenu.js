import { useEffect,useState} from "react";
import { MENU_API, PROXYURL } from "../utils/constants";
const useRestaurantMenu=(resId)=>{
    const [resInfo,setResInfo]=useState(null);
    //fetch data
    useEffect(()=>{
        fetchData();
    },[]);
const fetchData = async () => {
    try {
        const response = await fetch(`${PROXYURL}${encodeURIComponent(`${MENU_API}=${resId}`)}`);
        const json = await response.json();
        setResInfo(json.data);
    } catch (error) {
        console.error("Error fetching menu data:", error);
    }
};


    return resInfo;
}
export default useRestaurantMenu;