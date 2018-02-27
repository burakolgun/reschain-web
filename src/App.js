import React, { Component } from 'react';
import logo from './logo.svg';
import Marketing from './Components/Marketing/marketing';
import './App.css';


class App extends Component {
  render() {
      return (
      <div className="App">
          <Marketing/>
      </div>
    );
  }
}

export default App;
