import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import UserLandingPage from './components/UserLandingPage.js';
import UserLoginPage from "./components/UserLoginPage";
import UpdateUserPage from "./components/UpdateUserPage.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }


    render() {
        return (
            <Router>
            <div>
              <h2>Welcome to React</h2>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Home </Link></li>
                
                <li><Link to={'/login'} className="nav-link">Login</Link></li>
                <li><Link to={'/update'} className="nav-link">Update User Info</Link></li>
              </ul>
              </nav>
              <hr />
              <Switch>
                  <Route path='/login' component={UserLoginPage} />                  
                  <Route path='/landing_page' component={UserLandingPage} />
                  <Route path='/update' component={UpdateUserPage} />
              </Switch>
            </div>
          </Router>
            
        );
    }
}

export default App;
