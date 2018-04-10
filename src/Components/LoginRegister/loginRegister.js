import React from 'react';
import './loginRegister.css';
import { connect } from 'react-redux';
import { apiService } from '../../Services/apiService'
import { Redirect } from 'react-router-dom';

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { userName, password } = this.state;
        const { dispatch } = this.props;
        if (userName && password) {
            let returned = apiService.login(userName, password);
            if (returned) {
                return <Redirect to='/' />
            }
        }
    }

    render() {
        const { userName, email, password, submitted } = this.state;

        if (this.props.loggingIn === true) {
            return <Redirect to='/' />
        }

        return (

            <div className="main-page-container row col-md-10 offset-2">
                <div className="register-container col-md-5">
                <h3>REGISTER</h3>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                            <input type="text" 
                                   className="form-control" 
                                   name="userName" 
                                   value={userName} 
                                   onChange={this.handleChange} 
                                   placeholder="Username" />
                            {submitted && !userName &&
                                <div className="help-block">userName is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <input type="email" 
                                   className="form-control" 
                                   name="email" 
                                   value={email} 
                                   onChange={this.handleChange} 
                                   placeholder="E-mail" />
                            {submitted && !email &&
                                <div className="help-block">E-mail is required</div>
                            }
                        </div><div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <input type="password" 
                                   className="form-control" 
                                   name="password" 
                                   value={password} 
                                   onChange={this.handleChange} 
                                   placeholder="Password" />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-register col-md-4 offset-4">Start</button>
                            {this.props.loggingIn}
                        </div>
                    </form>
                </div>
                <div className="login-container col-md-4">
                <h3>LOGIN</h3>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                            <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleChange} />
                            {submitted && !userName &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-login col-md-4 offset-4">Login</button>
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
});

LoginRegister = connect(mapStateToProps)(LoginRegister);

export default LoginRegister;
