import React, { Component } from "react";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import UserCreateAccountPage from "./components/UserCreateAccountPage";
import UserLoginPage from "./components/UserLoginPage";
import UpdateUserPage from "./components/UpdateUserPage";
import UserLandingPage from "./components/UserLandingPage";
import CreateChallengePage from "./components/CreateChallengePage";
import LinkButton from "./components/LinkButton";
import ListAllChallengesPage from "./components/ListAllChallengesPage";
import ChallengePage from "./components/ChallengePage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => {
                            return (
                                <div id="container" class="container">
                                    <div class="fieldContainer">
                                        <div class="logo"></div>
                                        <h1> Welcome</h1>
                                        <div class="buttonContainer">
                                            <LinkButton to="/login">
                                                <img
                                                    className="left arrow"
                                                    src={require("./assets/leftArrow.png")}
                                                />
                                                Login
                                                <img
                                                    className="right arrow"
                                                    src={require("./assets/rightArrow.png")}
                                                />
                                            </LinkButton>

                                            <LinkButton to="/create_account">
                                                <img
                                                    className="left arrow"
                                                    src={require("./assets/leftArrow.png")}
                                                />
                                                Sign Up
                                                <img
                                                    className="right arrow"
                                                    src={require("./assets/rightArrow.png")}
                                                />
                                            </LinkButton>
                                        </div>
                                    </div>
                                    <div class="rightBackgroundContainer"></div>
                                </div>
                            );
                        }}
                    />
                    <Route path="/login" component={UserLoginPage} />
                    <Route path="/create_challenge" component={CreateChallengePage} />
                    <Route path="/update" component={UpdateUserPage} />
                    <Route path="/landing_page" component={UserLandingPage} />
                    <Route path="/create_account" component={UserCreateAccountPage} />
                    <Route path="/challenges" component={ListAllChallengesPage}></Route>
                    <Route path="/challenge" component={ChallengePage}></Route>
                </Switch>
            </Router>
        );
    }
}

export default App;