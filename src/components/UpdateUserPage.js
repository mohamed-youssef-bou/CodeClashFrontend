import React, { Component } from "react";
import "./UpdateUserPage.css";
import { Redirect } from 'react-router-dom';

export class UpdateUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUsername: "",
      newPassword: "",
      isRedirect: false,
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
      'user_id': "RANDOM USER ID TO FIX LATER",
      'new_username': this.state.newUsername,
      'new_password': this.state.newPassword,
    };

    fetch("/updateUser", {
      method: "PUT",
      body: JSON.stringify(data)
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
    //set error text to display
  }

  handleReturn() {
    //use Redirect from react-router-dom
    this.setState({ isRedirect: true });
    
  }

  render() {
    if( this.state.isRedirect) {
      return <Redirect to="/landing_page" />
      //NEED TO ADD PAGE IN THE ROUTES OF APP.JS
    }

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
