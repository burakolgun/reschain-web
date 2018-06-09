import React from 'react';
import './loading.css';

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