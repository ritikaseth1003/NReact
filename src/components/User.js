import {useState} from "react";
const User=({name})=>{
    const [count,ssetCount]=useState(0);
    useEffect(()=>{
        //API calls
    },[])

    return(
        
        <div className="user-card">
            <h1>Count={count}</h1>
            {/* Add details of the user here */}
            <h2>Name:{name}</h2>
            <h3>Location:Dehradun</h3>
            <h4>Contact:@akshaymarch7</h4>
        </div>
    )
}
export default User;