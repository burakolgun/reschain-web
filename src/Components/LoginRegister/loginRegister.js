import React from 'react';
import './loginRegister.css';
import { connect } from 'react-redux';
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
            loginSubmitted: false,
            loginMessage: '',
            registerMessage: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginHandleSubmit = this.loginHandleSubmit.bind(this);
        this.registerHandleSubmit = this.registerHandleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    registerHandleSubmit(e) {
        e.preventDefault();
        this.setState({ registerSubmitted: true });
        const { registerEmail, registerPassword, registerUserName } = this.state;
        const { dispatch } = this.props;
        if (registerEmail && registerPassword && registerUserName) {
            dispatch(userActions.register(registerEmail, registerPassword, registerUserName));
        }
    }

    loginHandleSubmit(e) {
        e.preventDefault();
        this.setState({ loginSubmitted: true });
        const { loginEmail, loginPassword } = this.state;
        const { dispatch } = this.props;
        if (loginEmail && loginPassword) {
            dispatch(userActions.login(loginEmail, loginPassword));
        }
    }


    render() {
        const { registerEmail, registerPassword, registerUserName, registerSubmitted, loading } = this.state;
        const { loginEmail, loginPassword, loginSubmitted } = this.state;

        let registerButton = this.props.loading && !this.props.type ? <Loading /> :
            <div>
                <button className="btn btn-register">Start</button>
            </div>;

        let loginButton = this.props.loading && this.props.type ? <Loading /> :
            <div>
                <button className="btn btn-login">Login</button>
            </div>;

        if (this.props.type != null) {
            if (this.props.type) {
                this.state.loginMessage = this.props.message;
            } else {
                this.state.registerMessage = this.props.message;
            }
        }

        if(this.props.loggingIn &&
           (localStorage.getItem('token') != null ||
           localStorage.getItem('token') != undefined)) 
           {            
            this.props.history.push("/my-chains");
        }

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
                                <div className="help-block">user name is required</div>
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
                            {registerButton}
                            <p>{this.state.registerMessage}</p>
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
                            {loginButton}
                            <p>{this.state.loginMessage}</p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loggingIn: state.loginReducer.loggingIn,
    loading: state.loginReducer.loading,
    message: state.loginReducer.message,
    type: state.loginReducer.type,
});

LoginRegister = connect(mapStateToProps)(LoginRegister);

export default LoginRegister;
