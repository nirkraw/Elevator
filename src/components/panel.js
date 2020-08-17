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
    //create the buttons on the panel box and give each one an id equivalent to their resepective floors
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
    const newFloor = Number(e.currentTarget.id); //use floor id and convert to number
    e.currentTarget.classList.add("on"); //add red light around destination buttons

    if (floorsPressed.includes(newFloor)) return; //if pressing an existing floor nothing happens
    floorsPressed.unshift(newFloor); //add new floor to floors array
    this.setState({ floorsPressed, destinationFloor: floorsPressed[0] });

    if (!this.state.moving) { // if elevator is not moving then it starts movement by going to next floor
      this.nextFloor();
    }
  };

  nextFloor() {
    const { floorsPressed } = this.state;
    if (floorsPressed.length === 0) { //if there are no floors in the queue it marks elevator as not moving
      this.setState({ moving: false });
      return;
    }
    this.setState({ moving: true });

    let currentFloor = this.state.currentFloor;
    const destinationFloor = floorsPressed[0];

    if (floorsPressed.includes(currentFloor)) { //if we pass a floor that is on the queue then stop
      const currentFloorIndex = floorsPressed.indexOf(currentFloor);
      const newFloorsPressed = floorsPressed
        .slice(0, currentFloorIndex)
        .concat(floorsPressed.slice(currentFloorIndex + 1)); // remove floor from queue 
      this.setState({
        floorsPressed: newFloorsPressed,
        message: "You Have Arrived", //add message to send to floor marker 
      });
      this.openDoors();
    } else {
      if (destinationFloor > currentFloor) {
        currentFloor++;
      } else {
        currentFloor--; //increment or decrement appropriately based on destination direction 
      }
      this.setState({ currentFloor });
      setTimeout(() => {
        this.nextFloor();
      }, 1000); //wait one second between floors to simulate elevator
    }
  }

  openDoors() {
    const leftDoor = document.getElementsByClassName("door-left")[0];
    const rightDoor = document.getElementsByClassName("door-right")[0];

    leftDoor.classList.remove("close"); //remove potential closed property from earlier 
    rightDoor.classList.remove("close");
    leftDoor.classList.add("open"); // start open animation 
    rightDoor.classList.add("open");

    const currentButton = document.getElementById(this.state.currentFloor);
    setTimeout(() => {
      currentButton.classList.remove("on"); //remove red light from button
      this.closeDoors(leftDoor, rightDoor);
    }, 4000);
  }

  closeDoors(leftDoor, rightDoor) {
    leftDoor.classList.remove("open");
    rightDoor.classList.remove("open");
    leftDoor.classList.add("close");
    rightDoor.classList.add("close");
    this.setState({ message: false }); // remove message from floor marker
    setTimeout(() => {
      this.nextFloor(); //continues to next floor
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
