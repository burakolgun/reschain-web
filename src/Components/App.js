import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Marketing from './Marketing/marketing';
import './App.css';
import Header from "../Container/header/header";
import Footer from "../Container/footer/footer";
import Content from "../Container/content/content";
import Login from "../Pages/Login/login";
import Register from "../Pages/Register/register";
import Chains from "./Chains/chains";
import MyChains from "./Chains/my-chains";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header />
                <Content>
                    <Switch>
                        <Route exact path='/' component={Marketing} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/calendar' component={Chains} />
                        <Route path='/chains' component={MyChains} />
                    </Switch>
                </Content>
                <Footer />
            </div>
        );
    }
}

export default App;
