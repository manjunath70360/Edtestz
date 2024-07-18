import { Component } from "react";

import CollapsibleExample from "../navbar";

import "./index.css"

class Home extends Component{

toappointment = ()=>{
    this.props.history.push('/appointment');
}


    render(){
        return(
            <div className="app-container">
                <CollapsibleExample />
                <div className="main-container">
                    <div className="image-container">
                    <img src="https://res.cloudinary.com/dwwunc51b/image/upload/v1719476531/Group-19348-1_v8gf8m.png" alt="mainlogo" className="revealing-image" />
                    <div className="text-overlay">Collaborate</div>
                    </div>
                    <p className="para">Feed Your Intelligence With Our Testing Approach.</p>
                    <button type="button" onClick={this.toappointment} className="get-started-btn">Get Started!</button>
                </div>
          
                <img src="https://res.cloudinary.com/dwwunc51b/image/upload/v1719480448/help_bug-removebg-preview_hfyrvm.png" onClick={this.toappointment} className="bug-img"  alt="bug"/>
          
            </div>
        )
    }
}

export default Home