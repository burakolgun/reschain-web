import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import {connect} from "react-redux";
import {apiService} from "../../Services/apiService";
import {userActions} from "../../Actions/userActions";

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
        let link = <Link className="col-md-3" to="/login">Login/Register</Link>;

        if(this.props.loggingIn === true) {
            link = <div className="col-md-3">
                <div className="col-md-10">
                <h5>Welcome {this.props.userName}</h5>
                </div>
                <div className="col-md-2">
                <button className="btn btn-secondary" onClick={this.logOut}>
                    LogOut
                </button>
                </div>
            </div>;
        }
        return (
            <header>
                <div className="col-md-2 logo">
                    <img src={require("../../Asset/img/logo.png")} />
                </div>
                <div className="col-md-7">

                </div>
                {link}
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