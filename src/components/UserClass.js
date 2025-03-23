import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                name: "Dummy",
                location: "Default",
                // avatar_url:"https://tse2.mm.bing.net/th?id=OIP.HendJ0HBV7N8_7ozAh3eNAHaHk&pid=Api&P=0&h=180"
            },
        };
        console.log(props);
    }

    async componentDidMount() {
    try {
        const response = await fetch("https://api.github.com/users/ritikaseth1003");
        const json = await response.json();
        console.log(json);
        
        // Ensure only required fields are updated
        this.setState({
            userInfo: {
                name: json.name || "No Name Available",
                location: json.location || "No Location Available",
                avatar_url: json.avatar_url || "",  // Include avatar_url here
            },
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
componentDidUpdate(){
    //called at the end
    console.log("Component did update!")
}
componentWillUnmount(){
    console.log("Component will unmount");
}

    render() {
        // Extract name and location from state
        const { name, location, avatar_url} = this.state.userInfo;

        return (
            <div className="user-card">
                <img src={avatar_url || "https://via.placeholder.com/150"} alt="User Avatar" />

                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: @ritikaseth1003</h4>
            </div>
        );
    }
}

export default UserClass;
