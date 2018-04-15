import React from 'react';
import './loading.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Loading extends React.Component {

    render() {
        return (
            <div className="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

export default Loading;