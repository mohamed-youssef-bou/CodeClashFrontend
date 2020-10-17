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
  }
  updateUsername(event) {
    this.setState({ newUsername: event.target.value });
  }

  handleSubmit() {

    let data = {
      "user_id": "RANDOM USER ID TO FIX LATER",
      "new_username": this.state.newUsername,
      "new_password": this.state.newPassword
    }

    fetch("http://localhost:9000/updateUser", {
      method: "PUT",
      body: JSON.stringify(data)
    })
    .then(res => console.log(res))
    .catch(err => err)
    //set error text to display
  }

  handleReturn() {
    //TODO perform navigation to base page
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
            value={this.state.newUsername}
            onChange={this.updateUsername}
          ></input>
          <label>New Password</label>
          <input
            type="text"
            value={this.state.newPassword}
            onChange={this.updatePassword}
          ></input>
          <button class="updateButton" onClick={this.handleSubmit}>
            Update
          </button>
          <p class="errorMessage"></p>
        </div>
      </div>
    );
  }
}

export default UpdateUserPage;
