import React, { Component } from "react";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/UserLoginPage.css";
import { Redirect } from "react-router-dom";
export class UserLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      navReady: false,
      returnToBase: false,
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateUsername(event) {
    this.setState({ username: event.target.value });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleReturn() {
    this.setState({ returnToBase: true });
  }

  async handleSubmit(event) {
    event.preventDefault();

    var isRedirect = false;

    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(JSON.stringify(data));
    await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }) // Login with body parameters: username and password
      .then((res) => {
        if (res.status === 200) {
          isRedirect = true;
        }
        return res.json();
      })
      .then((data) => (localStorage["token"] = data["token"]))
      .catch((err) => console.log(err));

    this.setState({ navReady: true });
  }

  render() {
    if (this.state.navReady) {
      return <Redirect to="/landing_page" />;
    }
    if (this.state.returnToBase) {
      return <Redirect to="/" />;
    }
    const leftArrow = require("../assets/leftArrow.png");
    const rightArrow = require("../assets/rightArrow.png");
    return (
      <div id="loginForm">
        <div class="leftContainer">
          <div class="logo" />
          <h1>Login</h1>
          <form
            className="form-inline"
            class="loginForm"
            onSubmit={this.handleSubmit}
          >
            {/* Username */}
            <label class="loginLabels" htmlFor="usernameInput">
              Username
            </label>
            <input
              type="name"
              className="form-control"
              id="usernameInput"
              placeholder="Username"
              value={this.state.username}
              onChange={this.updateUsername}
            ></input>

            {/* Password */}
            <label class="loginLabels" htmlFor="passwordInput">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              value={this.state.password}
              onChange={this.updatePassword}
            ></input>
          </form>
          <div className="loginButtons">
            <button type="submit" className="loginSubmit">
              <img className="left arrow" src={leftArrow} />
              Login
              <img className="right arrow" src={rightArrow} />
            </button>
            <button className="loginReturn" onClick={this.handleReturn}>
              <img className="left arrow" src={leftArrow} />
              Return
              <img className="right arrow" src={rightArrow} />
            </button>
          </div>
        </div>
        <div class="rightContainer" />
      </div>
    );
  }
}

export default UserLoginPage;
