import React from 'react';
import './loginRegister.css';
import {connect} from 'react-redux';
import * as loginAction from '../../Redux/actions/loginAction';

class LoginRegister extends React.Component
{
    constructor (props) {
        super(props)
    }

    onClick = (event) => {
        loginAction.setToken("");
    };

    render() {
        return (
            <div>
                <div className="Lr">
                    <button onClick={this.onClick}>Degistir</button>
                    <div id="register">REGISTER
                        <form>
                            <input className="input" type="text" name="userName" placeholder="User Name"/>
                            <input className="input" type="email" name="email" placeholder="E-Mail"/>
                            <input className="input" type="password" name="password" placeholder="Password"/>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div id="login">LOGIN</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    token: state.loginReducer.token,
    username: state.loginReducer.userName,
});

LoginRegister = connect(mapStateToProps)(LoginRegister);

export default LoginRegister;
