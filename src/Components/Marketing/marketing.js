import React, { Component } from "react";
import axios from "axios";
import './marketings.css';
import Moment from "react-moment";

export default class Marketing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarData: [],
            calendar : new Date()
        };

        this.getCalendarData();
    }

    getCalendarData = function() {
        axios.get("http://35.196.87.124/api").then(response => {
            this.setState({calendarData : response.data});
        });
    };
    
    render() {
        var calendarList = [];
        for (var i = 0; i <= this.state.calendarData.length; i++) {
            calendarList.push(<div className="day">{this.state.calendarData[i]}</div>);
        } 

        return (
            <div className="Marketing">
                <section className="calender">                
                    {this.state.calendar.getFullYear()}-{this.state.calendar.getMonth()}-{this.state.calendar.getDate()}
                    {calendarList}
                </section>
            </div>
        );
    }
}
