import React, { Component } from "react";
import "../styles/doors.css";

export default class Doors extends Component {
  render() {
    return (
      <div className="doors-main-div">
        <div className="door-left"></div>
        <div className="door-right"></div>
      </div>
    );
  }
}
