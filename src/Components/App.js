import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Marketing from './Marketing/marketing';
import './App.css';
import Header from "../Container/header/header";
import Footer from "../Container/footer/footer"
import Content from "../Container/content/content";


class App extends Component {
  render() {
      return (
      <div className="App">
          <Header/>
          <Content>
              <Switch>
                  <Route exact path='/' component={Marketing} />
                  <Route path='/deneme' component={Marketing} />
              </Switch>
          </Content>
          <Footer/>
      </div>
    );
  }
}

export default App;
