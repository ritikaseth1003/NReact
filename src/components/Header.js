import { LOGO_URL } from "../utils/constants.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import React from 'react';

const Header = () => {
    console.log("Header rendered");
    const [btnNameReact, setBtnNameReact] = useState("Login");
    
    // Get online status from the custom hook
    const onlineStatus = useOnlineStatus();
    
    useEffect(() => {
        // callback function.
        console.log("useEffect called!!")
    }, []);
    
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} alt="QuickBite logo"></img>
                <h1 className="name">QuickBite</h1>
            </div>

            <div className="nav-items">
                <ul>
                    <li>Online status: {onlineStatus ? "✅" : "🔴"}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li>
                    <li>Cart</li>
                    <button className="login" onClick={() => {
                        setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
                    }}>{btnNameReact}
                    </button>
                </ul>
            </div>
        </div>
    )
}

export default Header;
