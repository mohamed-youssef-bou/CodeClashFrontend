import React, { Component } from "react";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from "react-router-dom";
import UserCreateAccountPage from "./components/UserCreateAccountPage";
import UserLoginPage from "./components/UserLoginPage";
import UserUpdatePage, { UpdateUserPage } from "./components/UpdateUserPage"
import UserLandingPage from "./components/UserLandingPage"
import CreateChallengePage from "./components/CreateChallengePage"
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
          }} />
          <Route path='/login' component={UserLoginPage} />
          <Route path='/create_challenge' component={CreateChallengePage}/>
          <Route path='/update_user' component={UpdateUserPage}/>
          <Route path='/landing_page' component={UserLandingPage}/>
          <Route path='/create_account' component={UserCreateAccountPage} />
        </Switch>
      </Router>


    );
  }
}

export default App;