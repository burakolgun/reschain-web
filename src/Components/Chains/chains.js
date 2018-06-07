import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiService } from '../../Services/apiService';
import { alertActions } from '../../Actions/userActions';
import { chainActions } from '../../Actions/chainActions';
import './chains.css';
import Loading from "../Loading/loading";

class Chains extends Component {
    constructor(props) {
        super(props);

        if (!props.loggingIn) {
            props.history.push('/login');
        }

        this.state = {
            chains: [],
        };

        this.getChains = this.getChains.bind(this);
    }

    getChains() {
        const { dispatch } = this.props;
        dispatch(chainActions.getChains());
    }

    render() {

        if (!this.props.loggingIn) {
            this.props.history.push('/login');
        }

        let allChains = [];
        let days = [];
        let dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let date = new Date;
        let today = date.getDate();

        for (var i = 1; i < this.props.chains.length; i++) {
            allChains.push(<li key={this.props.chains[i].id}> {this.props.chains[i].name} </li>);
        }

        for (var j = 0; j < dayNames.length; j++) {
            let key = 1000 - j;
            days.push(<li key={key} className="mark-day-name">{dayNames[j]}</li>);
        }

        for (var i = 1; i <= 31; i++) {
            if (i == today) {
                days.push(<li key={i} className="mark-today"> {i} </li>);
            } else {
                days.push(<li key={i} className="mark-day" onClick={(e) => this.openRingInfo(e)}> {i} </li>);
            }
        }

        return (
            <div className="calender-container">
                <ul>
                    {days}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    chains: state.chainReducer.chains,
    loggingIn: state.loginReducer.loggingIn,
});

Chains = connect(mapStateToProps)(Chains);

export default Chains;
