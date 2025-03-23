import User from "./User.js";
import UserClass from "./UserClass.js";
import React from "react";
class About extends React.Component{
    //This class based component will also have its constructor method
    constructor(props){
        super(props);
        console.log("parent constructor");
    }
    componentDidMount(){
        // console.log("Parent componentDidMount.");
    }
    render(){
        // console.log("parent render");
      return(
        <div>
            <h1>About CLASS Component.</h1>
            <h2>This is Namaste React Web Series.</h2>
            {/* <User name={"Akshay Saini(Functional component.)"}/> */}

            <UserClass name={"FIRST(Class based component)"}location={"Dehradun class"}/>
        </div>    )
    }
}

export default About;