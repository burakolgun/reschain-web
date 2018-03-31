import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home"
import Marketing from "./Components/Marketing/marketing"

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/marketing">About</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="Components/Home/Home" component={Home} />
      <Route path="/Components/Marketing/Marketing" component={Marketing} />
    </div>
  </Router>
);

export default App;