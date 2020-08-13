import React, { Component } from "react";
import DoorsCSS from "../styles/doors.css";

export default class Doors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
    };
  }


  
  render() {
    // if (this.props.open) {
    //   this.openDoors();
    // }
    
    return (
      <div>
        <div className="elevator-frame">
          <div className="door-left"></div>
          <div className="door-right"></div>
        </div>
      </div>
    );
  }
}
