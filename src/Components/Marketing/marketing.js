import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

export default class Marketing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calendarData: [],
        };

        this.getCalendarData();
    }


    getCalendarData = function () {
        axios.get('http://35.196.87.124/api').then(response => {
            this.state.calendarData = response.data;
        });
    };

    render() {
        return (
            
            <div className="Marketing">
                <h4>Marketing Component</h4>
            </div>
        )
    }
}
