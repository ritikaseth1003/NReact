import User from "./User.js";
import UserClass from "./UserClass.js";
import React from "react";

class About extends React.Component {
    constructor(props) {
        super(props);
        console.log("parent constructor");
    }

    componentDidMount() {
        // console.log("Parent componentDidMount.");
    }

    render() {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="bg-orange-100 shadow-2xl rounded-2xl p-8 max-w-2xl text-center border border-orange-500">
                    <h1 className="text-4xl font-extrabold text-orange-700 mb-4 animate-fade-in">About QuickBite</h1>
                    <h2 className="text-lg text-orange-600 mb-6 animate-fade-in delay-200">
                        Your Go-To Destination for Fast and Delicious Food!
                    </h2>
                    <p className="text-gray-700 text-md mb-4">
                        At QuickBite, we are committed to delivering fresh, tasty, and convenient meals right to your doorstep. Whether you're craving a quick snack or a full-course meal, we have a diverse menu to satisfy your hunger.
                    </p>
                    <p className="text-gray-700 text-md mb-6">
                        Our mission is to revolutionize the food ordering experience by offering seamless navigation, fast deliveries, and exceptional customer service. With QuickBite, great food is just a few clicks away!
                    </p>
                    
                    <div className="p-4 border border-orange-300 rounded-lg shadow-md bg-orange-50 animate-slide-in">
                        <UserClass name={"Founder & CEO"} location={"Headquarters: Dehradun, India"} />
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
