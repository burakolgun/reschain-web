import React, { Component } from 'react';
import Marketing from './Components/Marketing/marketing';
import './App.css';
import Header from "./Container/header/header";
import Footer from "./Container/footer/footer"


class App extends Component {
  render() {
      return (
      <div className="App">
          <Header/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <Marketing/>

          <Footer/>
      </div>
    );
  }
}

export default App;
