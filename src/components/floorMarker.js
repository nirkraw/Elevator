import React, { Component } from "react";
import "../styles/floorMarker.css";

export default class FloorMarker extends Component {
  render() {
    const currentFloor =
      this.props.currentFloor === 0 ? "L" : this.props.currentFloor;
    return (
      <div className="floor-marker-outer">
        <div className="floor-marker-box">
          {this.props.message ? (
            <h1 id="message">{this.props.message}</h1>
          ) : (
            <h1>{currentFloor}</h1>
          )}
        </div>
      </div>
    );
  }
}
