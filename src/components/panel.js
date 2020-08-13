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
  }

  createPanel() {
    return Array(8)
      .fill()
      .map((_, i) =>
        i !== 0 ? (
          <div className="floor-button">
            <h1>{i}</h1>
          </div>
        ) : (
          <div className="floor-button">
            <h1>L</h1>
          </div>
        )
      );
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
