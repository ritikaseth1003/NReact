import { LOGO_URL } from "../utils/constants.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import React from "react";

const Header = () => {
    console.log("Header rendered");
    const [btnNameReact, setBtnNameReact] = useState("Login");
    
    // Get online status from the custom hook
    const onlineStatus = useOnlineStatus();
    
    useEffect(() => {
        console.log("useEffect called!!");
    }, []);
    
    return (
        <header className="bg-orange-500 shadow-lg p-4 flex justify-between items-center sticky top-0 z-50 w-full">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
                <img className="h-16 w-16 rounded-full border-2 border-white shadow-md" src={LOGO_URL} alt="QuickBite logo" />
                <h1 className="text-3xl font-extrabold text-white tracking-wide">QuickBite</h1>
            </div>

            {/* Navigation Section */}
            <nav className="hidden md:flex">
                <ul className="flex space-x-6 text-lg font-medium text-white">
                    <li className="flex items-center">
                        Online: <span className="ml-2">{onlineStatus ? "✅" : "🔴"}</span>
                    </li>
                    <li><Link className="hover:text-gray-200 transition-all duration-200" to="/">Home</Link></li>
                    <li><Link className="hover:text-gray-200 transition-all duration-200" to="/about">About</Link></li>
                    <li><Link className="hover:text-gray-200 transition-all duration-200" to="/contact">Contact</Link></li>
                    <li><Link className="hover:text-gray-200 transition-all duration-200" to="/grocery">Grocery</Link></li>
                    <li className="cursor-pointer hover:text-gray-200 transition-all duration-200">Cart</li>
                    
                    {/* Login Button */}
                    <button 
                        className="px-5 py-2 bg-white text-orange-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
                        onClick={() => setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login")}
                    >
                        {btnNameReact}
                    </button>
                </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white text-2xl">
                ☰
            </button>
        </header>
    );
};

export default Header;
