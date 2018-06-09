import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { connect } from "react-redux";
import LongMenu from "../../Components/Menu/longMenu";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let navigation =
            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>;

        if (this.props.loggingIn === true) {
            navigation = <div className="col-md-1">
                        <LongMenu/>
            </div>;
        }

        return (
            <header className="container-fluid">
                <div className="navbar col-md-12">
                    <div className="logo col-md-11">
                        <Link to="/">
                            <img src={require("../../Asset/img/logo.png")}  alt="logo"/>
                        </Link>
                    </div>
                    {navigation}
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
    loggingIn: state.loginReducer.loggingIn,
    userName: state.loginReducer.userName,
});

Header = connect(mapStateToProps)(Header);

export default Header