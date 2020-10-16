import React, { Component, useRef } from "react";
import "./UpdateUserPage.css";

export class UpdateUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = { newUsername: "", newPassword: "", isUpdatingPassword: false };

    //functions
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.setToUpdatePassword = this.setToUpdatePassword.bind(this);
    this.setToUpdateUsername = this.setToUpdateUsername.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
    this.handleReturn = this.handleReturn.bind(this)
  }

  setToUpdatePassword() {
      this.setState({isUpdatingPassword: true})
  }

  setToUpdateUsername() {
      this.setState({isUpdatingPassword: false})
  }

  updatePassword(event) {
    this.setState({ newPassword: event.target.value });
    console.log(event.target.value);
  }
  updateUsername(event) {
    this.setState({ newUsername: event.target.value });
  }

  handleSubmitPassword() {
    //TODO perform put API call
  }

  handleSubmitUsername() {
    //TODO perform put API call
  }

  handleReturn() {
    //TODO perform return to base page
  }

  render() {
    return (
      <div id="container" class="container">
        <button class="returnButton" onClick={this.handleReturn}>Return</button>
        <h1> Update User Information</h1>
        <div class="buttonWrapper">
          <button class="passwordButton" onClick={this.setToUpdatePassword}>
            Change Password
          </button>
          <button class="usernameButton" onClick={this.setToUpdateUsername}>
            Change Username
          </button>
        </div>
        <div class="fieldContainer">
          <div class={this.state.isUpdatingPassword ? "changePasswordContainer": 'hide'}>
            <label>Old Password</label>
            <input type="password" id="oldPasswordInput"></input>
            <label>New Password</label>
            <input
              type="text"
              id="newPasswordInput"
              value={this.state.newPassword}
              onChange={this.updatePassword}
            ></input>
            <button id="passwordUpdateButton" class="updateButton">
              Update
            </button>
          </div>

          <div class={this.state.isUpdatingPassword ? "hide": "changeUsernameContainer"}>
            <label>New Username</label>
            <input
              type="text"
              id="newUsernameInput"
              value={this.state.Username}
              onChange={this.updateUsername}
            ></input>
            <label>Password</label>
            <input type="password" id="passwordInput"></input>
            <button id="usernameUpdateButton" class="updateButton">
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateUserPage;
