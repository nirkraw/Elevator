import React, { Component } from "react";
import "../styles/panel.css";
import Doors from "./doors.js";
import FloorMarker from "./floorMarker";

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFloor: 0,
      floorsPressed: [],
      moving: false,
      message: null,
    };
  }

  createPanel() {
    return Array(8)
      .fill()
      .map((_, i) => (
        <div className="floor-button" id={i} key={i} onClick={this.addFloor}>
          {i !== 0 ? <h1>{i}</h1> : <h1>L</h1>}
        </div>
      ));
  }

  addFloor = (e) => {
    e.preventDefault();
    const floorsPressed = this.state.floorsPressed;
    const newFloor = e.target.innerText;
    e.currentTarget.classList.add("on");

    if (floorsPressed.includes(newFloor)) return;

    floorsPressed.push(newFloor);
    floorsPressed.sort(function (a, b) {
      return a - b;
    });

    this.setState({ floorsPressed, destinationFloor: floorsPressed[0] });

    if (!this.state.moving) {
      this.nextFloor();
    }
  };

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
      this.setState({
        floorsPressed: this.state.floorsPressed.slice(1),
        message: "You Have Arrived",
      });
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

    const currentButton = document.getElementById(this.state.currentFloor);
    setTimeout(() => {
      currentButton.classList.remove("on");
      this.closeDoors(leftDoor, rightDoor);
    }, 4000);
  }

  closeDoors(leftDoor, rightDoor) {
    leftDoor.classList.remove("open");
    rightDoor.classList.remove("open");
    leftDoor.classList.add("close");
    rightDoor.classList.add("close");
    this.setState({ message: false });
    setTimeout(() => {
      this.nextFloor();
    }, 4000);
  }

  render() {
    const panel = this.createPanel();
    return (
      <div className="main-view">
        <FloorMarker
          message={this.state.message}
          currentFloor={this.state.currentFloor}
        />
        <Doors />
        <div className="main-panel-box">{panel}</div>
      </div>
    );
  }
}
