import { useState,useEffect} from "react";
//gives the online status of a particular user.

const useOnlineStatus=()=>{
    const [onlineStatus,setOnlineStatus]=useState(true);
    //Check if online
    useEffect(()=>{
        window.addEventListener("offline", () => {
            setOnlineStatus(false);
        });
        window.addEventListener("online", () => {
            setOnlineStatus(true);
        });


    },[]);
    //boolean value
    return onlineStatus;
}
export default useOnlineStatus;