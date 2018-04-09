import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Marketing from './Marketing/marketing';
import './App.css';
import Header from "../Container/header/header";
import Footer from "../Container/footer/footer"
import Content from "../Container/content/content";
import LoginRegister from "./LoginRegister/loginRegister";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Content>
                    <Switch>
                        <Route exact path='/' component={Marketing} />
                        <Route path='/login' component={LoginRegister} />
                    </Switch>
                </Content>
                <Footer />
            </div>
        );
    }
}

export default App;
