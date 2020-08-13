import React, { Component } from 'react'
import FloorMarkerCSS from "../styles/floorMarker.css"

export default class FloorMarker extends Component {
    render() {
        const currentFloor = this.props.currentFloor === 0 ? "L" : this.props.currentFloor;
        return (
            <div className="floor-marker-outer">
                <div className="floor-marker-box">
                    <h1>{currentFloor}</h1>
                </div>
            </div>
        )
    }
}
