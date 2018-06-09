import React from 'react';
import './register.css';
import { connect } from 'react-redux';
import { userActions } from "../../Actions/userActions";
import Loading from "../../Components/Loading/loading";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            registerUserName: '',
            registerEmail: '',
            registerPassword: '',
            registerSubmitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
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

    render() {
        const {registerEmail, registerPassword, registerUserName, registerSubmitted} = this.state;

        let registerButton = this.props.loading && !this.props.type ? <Loading/> :
            <div>
                <button className="btn btn-register">Start</button>
            </div>;

        if (this.props.loggingIn) {
            this.props.history.push("/chain");
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
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loggingIn: state.loginReducer.loggingIn,
    type: state.loginReducer.type,
});

Register = connect(mapStateToProps)(Register);
export default Register;
