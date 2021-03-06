import React, { Component } from "react";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/UserCreateAccountPage.css";
import { Redirect } from "react-router-dom";
import logo from "../assets/logoEdited.png"


export class UserCreateAccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "", navReady: false };

    this.updateUsername = this.updateUsername.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateUsername(event) {
    this.setState({ username: event.target.value });
  }
  updateEmail(event) {
    this.setState({ email: event.target.value });
  }
  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleReturn() {
    this.setState({ navReady: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    fetch(`/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }) // Login with body parameters: username, email and password
      .then((res) => {
        if (res.status === 201) {
          this.setState({ navReady: true });
        }
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.navReady) {
      return <Redirect to="/login" />;
    }
    const leftArrow = require("../assets/leftArrow.png");
    const rightArrow = require("../assets/rightArrow.png");
    return (
      <div id="createUserForm">
        <div className="leftContainer">
        <img className='img logo_style' src={logo} alt="Logo"/>          
          <h1 className="text">Sign up for an account</h1>
          <form className="form-inline" className="signUpForm">
            {/* Username */}
            <label className="signUpLabels" htmlFor="usernameInput">
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

            {/* Email */}
            <label className="signUpLabels" htmlFor="emailInput">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.updateEmail}
            ></input>

            {/* Password */}
            <label className="signUpLabels" htmlFor="passwordInput">
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
          <div className="signUpButtons">
            <button onClick={this.handleSubmit} className="signUpSubmit">
              <img className="left arrow" src={leftArrow} />
              Create
              <img className="right arrow" src={rightArrow} />
            </button>
            <button className="signUpReturn" onClick={this.handleReturn}>
              <img className="left arrow" src={leftArrow} />
              Return
              <img className="right arrow" src={rightArrow} />
            </button>
          </div>
          {/* <button type="navigate" className="btn btn-primary mb-2" onPressed={() => this.navLandingPage}>Landing Page </button> */}
        </div>
        <div className="rightContainer" />
      </div>
    );
  }
}

export default UserCreateAccountPage;
