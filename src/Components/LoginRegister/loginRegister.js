import React from 'react';
import './loginRegister.css';
import { Link } from 'react-router-dom';
const LoginRegister = () =>
    <div>
        <div className="Lr">
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
    </div>;
export default LoginRegister;
