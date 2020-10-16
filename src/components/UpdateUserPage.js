import React, { Component } from "react";
import "./UpdateUserPage.css";

export class UpdateUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUsername: "",
      newPassword: "",
    };

    //functions
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.handleSubmitUsername = this.handleSubmit.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  updatePassword(event) {
    this.setState({ newPassword: event.target.value });
    console.log(event.target.value);
  }
  updateUsername(event) {
    this.setState({ newUsername: event.target.value });
  }

  handleSubmit() {
    //TODO perform put API call
  }

  handleReturn() {
    //TODO perform return to base page
  }

  render() {
    return (
      <div id="container" class="container">
        <button class="returnButton" onClick={this.handleReturn}>
          Return
        </button>
        <h1> Update User Information</h1>
        <div class="fieldContainer">
        <label>New Username</label>
          <input
            type="text"
            id="newUsernameInput"
            value={this.state.Username}
            onChange={this.updateUsername}
          ></input>
          <label>New Password</label>
          <input
            type="text"
            id="newPasswordInput"
            value={this.state.newPassword}
            onChange={this.updatePassword}
          ></input>
          <button class="updateButton" onClick={this.handleSubmit}>
            Update
          </button>
        </div>
      </div>
    );
  }
}

export default UpdateUserPage;
