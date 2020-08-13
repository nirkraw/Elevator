import React, { Component } from "react";
import DoorsCSS from "../styles/doors.css";

export default class Doors extends Component {

  render() {
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
