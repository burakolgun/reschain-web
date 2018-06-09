import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { connect } from "react-redux";
import { userActions } from "../../Actions/userActions";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    logOut = () => {
        const { dispatch } = this.props;
        dispatch(userActions.logOut())
    };

    render() {
        let navigation =
            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>;

        if (this.props.loggingIn === true) {
            navigation = <div className="container">
                        <span>
                            <h5>Welcome {this.props.userName}</h5>
                        </span>
                        <span>
                            <button className="btn btn-secondary btn-sm" onClick={this.logOut}>
                                LogOut
                            </button>
                        </span>
                  </div>;
        }

        return (
            <header>
                <div className="navbar">
                    <div className="logo">
                        <Link to="/">
                            <img src={require("../../Asset/img/logo.png")}  alt="logo"/>
                        </Link>
                    </div>
                    <div className="">
                        {navigation}
                    </div>
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