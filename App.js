{/* <div id="parent">
    <div id="child">
        <h1>I'm an H1 tag</h1>
        <h2>I'm an H2 tag</h2>
    </div>
        <div id="child2">
        <h1>I'm an H1 tag</h1>
        <h2>I'm an H2 tag</h2>
    </div>
</div> */}
// how do i create nested elements inside react.React


    
    
    // const heading=React.createElement("h1",{id:"heading"},"Hello World from React!")

    //creating an element is a core thing of react so it comes from React 
    //creating a root is the job of ReactDOM
const parent=React.createElement("div",{id:"parent"},React.createElement("div",{id:"child"},[React.createElement("h1",{},"I'm an H1 tag!"),React.createElement("h2",{},"I'm an H2 tag!")]))
const root=ReactDOM.createRoot(document.getElementById("root"))
    root.render(parent);//now this ll be responsible to convert object to h1 tag.



