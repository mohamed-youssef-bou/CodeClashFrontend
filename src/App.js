import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import testCrud from './components/testCrud.js';
import Home from './components/home.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/test")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <Router>
            <div>
              <h2>Welcome to React</h2>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Home </Link></li>
                <li><Link to={'/testcrud'} className="nav-link">testCrud</Link></li>
              </ul>
              </nav>
              <hr />
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/testCrud' component={testCrud} />
              </Switch>
            </div>
          </Router>
            
        );
    }
}

export default App;
