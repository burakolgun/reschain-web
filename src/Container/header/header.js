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
        let link = <Link to="/login">Login/Register</Link>;

        if (this.props.loggingIn === true) {
            link = <div className="container-fluid">
                        <span className="">
                            <h5>Welcome {this.props.userName}</h5>
                        </span>
                        <span className="d-inline-block header-right">
                            <button className="btn btn-secondary btn-sm" onClick={this.logOut}>
                                LogOut
                            </button>
                        </span>
                        <div className="">
                            <Link to="/my-chains">
                                My Chains
                            </Link>
                        </div>
                  </div>;
        }

        return (
            <header>
                <div>
                    <div className="logo">
                        <Link to="/">
                            <img src={require("../../Asset/img/logo.png")} />
                        </Link>
                    </div>
                    <div className="">
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