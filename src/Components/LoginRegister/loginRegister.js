import React from 'react';
import './loginRegister.css';
import {connect} from 'react-redux';
import { apiService } from '../../Services/apiService'
import { Redirect } from 'react-router-dom';

class LoginRegister extends React.Component
{
    constructor (props) {
        super(props);

        this.state = {
            userName: '',
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
        const { userName, password, submitted } = this.state;

        if (this.props.loggingIn === true) {
            return <Redirect to='/' />
        }

        return (

            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                        <label htmlFor="userName">userName</label>
                        <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleChange} />
                        {submitted && !userName &&
                        <div className="help-block">userName is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {this.props.loggingIn}
                    </div>
                </form>
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
