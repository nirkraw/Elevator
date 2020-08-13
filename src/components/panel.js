import React, { Component } from 'react'
import PanelCSS from "../styles/panel.css"
import Doors from "./doors.js"
import FloorMarker from "./floorMarker"

export default class Panel extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             currentFloor: 0,
             floorsPressed: []
        }
    }

    createPanel() {
        return Array(8).fill().map((_, i) => <div className="floor-button"><h1>{i}</h1></div>);
    }
    
    render() {
        const panel = this.createPanel();
        return (
            <div className="main-view">
                <FloorMarker />
                <Doors currentFloor= {this.state.currentFloor}/>
                <div className="main-panel-box">
                    {panel}
                </div>
            </div>

        )
    }
}
