import React, { Component } from "react";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from "react-router-dom";
import UserCreateAccountPage from "./components/UserCreateAccountPage";
import UserLoginPage from "./components/UserLoginPage";
import LinkButton from "./components/LinkButton"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }


    render() {
        return (
            <Router>
                <Switch>
                <Route path="/" exact render={() => {
                    return (
                      <div class="window">
                      <section class="container">
                      <div class="left-half">
                      <img class="logo" src={require('/Users/maireadmaloney/Documents/ECSE428/ECSE428_G07_Frontend/src/assets/logoEdited.png')}>
                      </img>
                      <div>
                          <LinkButton to='/login'>Login</LinkButton>
                          <LinkButton to='/create_account'>Sign Up</LinkButton>          
                    
                      </div>
                      
                    </div>
                    <div class="right-half">
                    </div>
                    
                    </section>
                    </div>
                    );
                }}/>
                     <Route path='/login' component={UserLoginPage} />                  
                     
                     <Route path='/create_account' component={UserCreateAccountPage} />                
                     </Switch>
            </Router>
       
  
        // return (
        //   <Router>
            
        // <Switch>
        // <Route path="/" exact render={() => {
        //             return (
                      
        //               );
        //             }}/>
        //            <Route path='/login' component={UserLoginPage} />                  
        //            <Route path='/create_account' component={UserCreateAccountPage} />
        //     </Switch>
        //     </div>
        // </Router>

        
          
      
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