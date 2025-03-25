
import React,{lazy,Suspense} from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";
import { createBrowserRouter} from "react-router-dom";

// In your index.js or App.js
import './index.css';
 // or whatever your CSS file is named

// import About from "./components/About.js"
import Contact from "./components/Contact.js";
import {RouterProvider,Outlet} from "react-router-dom";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
// import Grocery from "./components/Grocery.js";

const Grocery = lazy(() => import("./components/Grocery.js"));
const About=lazy(()=>import("./components/About.js"));

const AppLayout=()=>{//TOP LEVEL COMPONENT CONTAING ALL OTHER COMPONENTS!
    return(
        <div className="app">
            <Header/>
           <Outlet/>
            
            <Footer/>

        </div>
    )
}

const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
            path:"/",
            element:<Body/>
        },
            {
        path:"/about",
        element:<Suspense fallback={<h1>Loading...</h1>}><About/></Suspense>,
        },
        {
        path:"/contact",
        element:<Contact/>,
        },
        {
        path:"/grocery",
        element:<Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>,
        },
        {
        path:"/restaurants/:resId",
        element:<RestaurantMenu/>,
        },
        ],
        errorElement:<Error/>,
    }
    
])

const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);


