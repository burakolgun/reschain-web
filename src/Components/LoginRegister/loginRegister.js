import React from 'react';
import './loginRegister.css';
import { connect } from 'react-redux';
import { apiService } from '../../Services/apiService'
import { Redirect } from 'react-router-dom';
import { alertActions } from '../../Actions/userActions'
import { userActions } from "../../Actions/userActions";
import Loading from "../Loading/loading";

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            registerUserName: '',
            registerEmail: '',
            registerPassword: '',
            registerSubmitted: false,
            loginUserName: '',
            loginEmail: '',
            loginPassword: '',
            loginSubmitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginHandleSubmit = this.loginHandleSubmit.bind(this);
        this.registerHandleSubmit = this.registerHandleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    loginHandleSubmit(e) {
        e.preventDefault();
        this.setState({ loginSubmitted: true });
        const { loginEmail, loginPassword } = this.state;
        const { dispatch } = this.props;
        if (loginEmail && loginPassword) {
            let returned = apiService.login(loginEmail, loginPassword);
            if (returned) {
                return <Redirect to='/' />
            }
        }
    }

    registerHandleSubmit(e) {
        e.preventDefault();
        this.setState({ registerSubmitted: true });
        const { registerEmail, registerPassword, registerUserName } = this.state;
        const { dispatch } = this.props;
        if (registerEmail && registerPassword && registerUserName) {
            dispatch(userActions.register(registerEmail, registerPassword, registerUserName))
        }
    }


    render() {
        const { registerEmail, registerPassword, registerUserName, registerSubmitted, loading } = this.state;
        const { loginEmail, loginPassword, loginSubmitted } = this.state;

        if (this.props.loggingIn === true) {
            return <Redirect to='/' />
        }
        let button = this.props.loading ? <Loading /> :
            button =
            <button className="btn btn-register">Start</button>
                { this.props.loggingIn }



        return (

            <div className="main-page-container">
                <div className="register-container">
                    <h3>REGISTER</h3>
                    <form name="register-form" onSubmit={this.registerHandleSubmit}>
                        <div className={'form-group' + (registerSubmitted && !registerUserName ? ' has-error' : '')}>
                            <input type="text"
                                className="form-control"
                                name="registerUserName"
                                value={registerUserName}
                                onChange={this.handleChange}
                                placeholder="Username" />
                            {registerSubmitted && !registerUserName &&
                                <div className="help-block">userName is required</div>
                            }
                        </div>
                        <div className={'form-group' + (registerSubmitted && !registerEmail ? ' has-error' : '')}>
                            <input type="email"
                                className="form-control"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={this.handleChange}
                                placeholder="E-mail" />
                            {registerSubmitted && !registerEmail &&
                                <div className="help-block">E-mail is required</div>
                            }
                        </div><div className={'form-group' + (registerSubmitted && !registerPassword ? ' has-error' : '')}>
                            <input type="password"
                                className="form-control"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={this.handleChange}
                                placeholder="Password" />
                            {registerSubmitted && !registerPassword &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            {button}
                        </div>
                    </form>
                </div>
                <div className="login-container">
                    <h3>LOGIN</h3>
                    <form name="login-form" onSubmit={this.loginHandleSubmit}>
                        <div className={'form-group' + (loginSubmitted && !loginEmail ? ' has-error' : '')}>
                            <input type="text"
                                className="form-control"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={this.handleChange} />
                            {loginSubmitted && !loginEmail &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        <div className={'form-group' + (loginSubmitted && !loginPassword ? ' has-error' : '')}>
                            <input type="password"
                                className="form-control"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={this.handleChange} />
                            {loginSubmitted && !loginPassword &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-login">Login</button>
                            {this.props.loggingIn}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userName: state.loginReducer.userName,
    loggingIn: state.loginReducer.loggingIn,
    loading: state.loginReducer.loading,
});

LoginRegister = connect(mapStateToProps)(LoginRegister);

export default LoginRegister;
