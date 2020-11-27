import React, { Component } from "react";
import "./UpdateUserPage.css";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import logo from "/Users/maireadmaloney/Documents/ECSE428/ECSE428_G07_Frontend/src/assets/logoEdited.png"


export class UpdateUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUsername: "",
      newPassword: "",
      isRedirect: false,
      userEmail: "",
    };

    //functions
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  updatePassword(event) {
    this.setState({ newPassword: event.target.value });
  }
  updateUsername(event) {
    this.setState({ newUsername: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let data = {
      user_id: jwt_decode(localStorage.getItem("token")).user._id,
      new_username: this.state.newUsername,
      new_password: this.state.newPassword,
    };

    fetch("/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    //set error text to display
    this.setState({
      isRedirect: true,
    });
  }

  handleReturn() {
    //use Redirect from react-router-dom
    this.setState({ isRedirect: true });
  }

  getEmail() {
    const _id = jwt_decode(localStorage.getItem("token")).user._id;
    fetch("http://localhost:9000/" + _id)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          userEmail: res.email,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getEmail();
  }

  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/landing_page" />;
      //NEED TO ADD PAGE IN THE ROUTES OF APP.JS
    }

    return (
      <div id="container" class="container">
        <div class="fieldContainer">
          <img class='img logo_style' src={logo} alt="Logo"/>  
          <h1 class="text">Update Account Details</h1>        
          <label>Username</label>
          <input
            class="usernameInput"
            type="text"
            value={this.state.newUsername}
            onChange={this.updateUsername}
          ></input>
          <label>Email Address</label>
          <input class="emailInput" 
          type="text"
          value={this.state.userEmail}
           />
          <label>Password</label>
          <input
            class="passwordInput"
            type="text"
            value={this.state.newPassword}
            onChange={this.updatePassword}
          ></input>
          <div class="buttonContainer">
            <button class="updateButton" onClick={this.handleSubmit}>
              <img
                className="left arrow"
                src={require("../assets/leftArrow.png")}
              />
              Update
              <img
                className="right arrow"
                src={require("../assets/rightArrow.png")}
              />
            </button>
            <button class="returnButton" onClick={this.handleReturn}>
              <img
                className="left arrow"
                src={require("../assets/leftArrow.png")}
              />
              Return
              <img
                className="right arrow"
                src={require("../assets/rightArrow.png")}
              />
            </button>
          </div>
          <p class="errorMessage"></p>
        </div>
        <div class="rightBackgroundContainer"></div>
      </div>
    );
  }
}

export default UpdateUserPage;
