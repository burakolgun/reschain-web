import React from 'react';
import './login.css';
import { connect } from 'react-redux';
import { userActions } from "../../Actions/userActions";
import Loading from "../../Components/Loading/loading";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginUserName: '',
            loginEmail: '',
            loginPassword: '',
            loginSubmitted: false,
            loginMessage: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginHandleSubmit = this.loginHandleSubmit.bind(this);
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
            dispatch(userActions.login(loginEmail, loginPassword));
        }
    }

    render() {
        const { loginEmail, loginPassword, loginSubmitted } = this.state;
        let loginButton = this.props.loading && this.props.type ? <Loading /> :
            <div>
                <button className="btn btn-login">Login</button>
            </div>;

        if (this.props.message != null) {
                this.state.loginMessage = this.props.message
        }

        if (this.props.loggingIn) {
            this.props.history.push("/chain");
        }

        return (

            <div className="main-page-container">
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

Login = connect(mapStateToProps)(Login);
export default Login;
