import React, { Component } from "react";
import PanelCSS from "../styles/panel.css";
import Doors from "./doors.js";
import FloorMarker from "./floorMarker";

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFloor: 0,
      floorsPressed: [],
    };

    this.addFloor = this.addFloor.bind(this);
  }

  createPanel() {
    return Array(8)
      .fill()
      .map((_, i) =>
        i !== 0 ? (
          <div className="floor-button" onClick={this.addFloor}>
            <h1>{i}</h1>
          </div>
        ) : (
          <div className="floor-button" onClick={this.addFloor}>
            <h1>L</h1>
          </div>
        )
      );
  }

  addFloor(e) {
    e.preventDefault();
    const floorsPressed = this.state.floorsPressed;
    const newFloor = e.target.innerText;
    
    if(floorsPressed.includes(newFloor)) return
    
    floorsPressed.push(newFloor);
    floorsPressed.sort(function(a,b) {
        return a-b
    });
    
    this.setState({floorsPressed});
  }


  render() {
    const panel = this.createPanel();
    return (
      <div className="main-view">
        <div className="floor-marker-main">
          <FloorMarker currentFloor={this.state.currentFloor} />
        </div>
        <div className="doors-and-panel-main">
          <Doors currentFloor={this.state.currentFloor} />
          <div className="main-panel-box">{panel}</div>
        </div>
      </div>
    );
  }
}
