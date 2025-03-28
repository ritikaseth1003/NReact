import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                name: "Dummy",
                location: "Default",
                avatar_url: "",
            },
        };
    }
//ok
async componentDidMount() {  
    console.log("Fetching data...");

    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN; // ✅ Get from environment variable

    try {
        const response = await fetch("https://api.github.com/users/ritikaseth1003", {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });

        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        console.log("API Response:", json);

        this.setState({
            userInfo: {
                name: json.name || "No Name Available",
                location: json.location || "No Location Available",
                avatar_url: json.avatar_url || "", 
            },
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

    render() {
        const { name, location, avatar_url } = this.state.userInfo;

        return (
            <div className="user-card p-6 bg-white shadow-lg rounded-lg text-center">
                <img
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-orange-500"
                    src={avatar_url || "https://via.placeholder.com/150"}
                    alt="User Avatar"
                />
                <h2 className="text-2xl font-semibold text-gray-800">Name: {name}</h2>
                <h3 className="text-lg text-gray-600">Location: {location}</h3>
                <h4 className="text-sm text-orange-700 font-medium">@ritikaseth1003</h4>
            </div>
        );
    }
}

export default UserClass;
