import React, { Component } from "react";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import button from 'react-bootstrap/Button';
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import UserLandingPage from './components/UserLandingPage';
import UserCreateAccountPage from "./components/UserCreateAccountPage";
import UserLoginPage from "./components/UserLoginPage";
import UpdateUserPage from "./components/UpdateUserPage";
import CreateChallengePage from "./components/CreateChallengePage";
import logo from "./assets/logo.png"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }


    render() {
        return (

          <section class="container">
          <div class="left-half">
            <img class="logo" src={require('/Users/maireadmaloney/Documents/ECSE428/ECSE428_G07_Frontend/src/assets/logo.png')}>
            </img>
            <div>
              <h1>Welcome to CodeClash</h1>
              <div>
                <button class="btn-style"> Login</button>
                <button class="btn-style">Sign Up</button>
              </div>
                          
            </div>
          </div>
          <div class="right-half">
          </div>
        </section>
          
        
          
          //   <Router>
          //   <div>
          //     <h2 style={{textAlign: "center"}}>Welcome to PuzzlR</h2>
          //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
          //     <ul className="navbar-nav mr-auto">
          //       <li><Link to={'/'} className="nav-link"> Home </Link></li>         
          //       <li><Link to={'/login'} className="nav-link">Login</Link></li>
          //       <li><Link to={'/create_account'} className="nav-link">Create Account</Link></li>
          //       <li><Link to={'/update'} className="nav-link">Update User Info</Link></li>
          //       <li><Link to={'/create_challenge'} className="nav-link">Create Challenge</Link></li>
          //     </ul>
          //     </nav>
          //     <hr />
          //     <Switch>
          //         <Route path='/login' component={UserLoginPage} />                  
          //         <Route path='/landing_page' component={UserLandingPage} />
          //         <Route path='/update' component={UpdateUserPage} />
          //         <Route path='/create_account' component={UserCreateAccountPage} />
          //         <Route path='/create_challenge' component={CreateChallengePage}></Route>
          //     </Switch>
          //   </div>
          // </Router>
            
        );
    }
}

export default App;