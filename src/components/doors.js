import React, { Component } from "react";
import DoorsCSS from "../styles/doors.css";
import Image from "../assets/matrixhallway.jpg";

export default class Doors extends Component {
  render() {
    return (
      <div className="doors-main-div">
        <img className="hallway" src={Image}></img>
        <div className="elevator-frame">
          <div className="door-left"></div>
          <div className="door-right"></div>
        </div>
      </div>
    );
  }
}
