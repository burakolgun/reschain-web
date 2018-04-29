import React, { Component } from 'react';
import './header.css';

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <header>
                <div className="logo">
                    <img src="./logo.png" />
                </div>
            </header>
        )
    }
}
