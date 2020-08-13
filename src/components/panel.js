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
      open: false,
      moving: false,
    };

    this.addFloor = this.addFloor.bind(this);
    this.openHandler = this.openHandler.bind(this);
    this.nextFloor = this.nextFloor.bind(this);
  }

  createPanel() {
    return Array(8)
      .fill()
      .map((_, i) =>
        i !== 0 ? (
          <div className="floor-button" key={i} onClick={this.addFloor}>
            <h1>{i}</h1>
          </div>
        ) : (
          <div className="floor-button" key={i} onClick={this.addFloor}>
            <h1>L</h1>
          </div>
        )
      );
  }

  addFloor(e) {
    e.preventDefault();
    const floorsPressed = this.state.floorsPressed;
    const newFloor = e.target.innerText;

    if (floorsPressed.includes(newFloor)) return;

    floorsPressed.push(newFloor);
    floorsPressed.sort(function (a, b) {
      return a - b;
    });

    this.setState({ floorsPressed, destinationFloor: floorsPressed[0] });

    if (!this.state.moving) {
      this.nextFloor();
    }
  }

  nextFloor() {
    if (this.state.floorsPressed.length === 0) {
      this.setState({ moving: false });
      return;
    }
    this.setState({ moving: true });

    let currentFloor = this.state.currentFloor;
    let destinationFloor =
      this.state.floorsPressed[0] === "L" ? "0" : this.state.floorsPressed[0];
 
    if (currentFloor.toString() === destinationFloor) {
        this.setState({ floorsPressed: this.state.floorsPressed.slice(1) });
        this.openDoors();
    } else {
        if (destinationFloor > currentFloor) {
            currentFloor++;
      } else {
        currentFloor--;
      }
      this.setState({ currentFloor });
      setTimeout(() => {
        this.nextFloor();
      }, 1000);
    }
  }

  openDoors() {
    const leftDoor = document.getElementsByClassName("door-left")[0];
    const rightDoor = document.getElementsByClassName("door-right")[0];

    leftDoor.classList.remove("close");
    rightDoor.classList.remove("close");
    leftDoor.classList.add("open");
    rightDoor.classList.add("open");
    setTimeout(() => {
      this.closeDoors(leftDoor, rightDoor);
    }, 4000);
  }

  closeDoors(leftDoor, rightDoor) {
    leftDoor.classList.remove("open");
    rightDoor.classList.remove("open");
    leftDoor.classList.add("close");
    rightDoor.classList.add("close");

    setTimeout(() => {
      this.nextFloor();
    }, 4000);

  }

  openHandler(boolean) {
    this.setState({ open: boolean });
  }

  render() {
    const panel = this.createPanel();
    return (
      <div className="main-view">
        <div className="floor-marker-main">
          <FloorMarker currentFloor={this.state.currentFloor} />
        </div>
        <div className="doors-and-panel-main">
          <Doors
            currentFloor={this.state.currentFloor}
            floorsPressed={this.state.floorsPressed}
            open={this.state.open}
            openHandler={this.openHandler}
            nextFloor={this.nextFloor}
          />
          <div className="main-panel-box">{panel}</div>
        </div>
      </div>
    );
  }
}
