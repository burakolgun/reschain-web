import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { connect } from "react-redux";
import { apiService } from "../../Services/apiService";
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
        let link = <Link to="/login">Login/Register</Link>;

        if (this.props.loggingIn === true) {
            link = <div>
                <span>Welcome {this.props.userName}</span>
                <button className="btn btn-secondary" onClick={this.logOut}>Log out</button>
            </div>;
        }
        return (
            <header>
                <div className="container">
                    <div className="logo">
                        <Link to="/">
                            <img src={require("../../Asset/img/logo.png")} />
                        </Link>
                    </div>
                    <div className="header-right">
                        {link}
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