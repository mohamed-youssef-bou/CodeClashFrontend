import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";

export class UserLandingPage extends Component {
  state = {
    email: "",
    username: "",
    score: 0,
    challengesCreated: [],
    submissions: [],
    navReady: false,
  };

  callAPI() {
    var _id = jwt_decode(localStorage.getItem("token")).user._id;

    fetch("http://localhost:9000/" + _id)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          email: res.email,
          username: res.username,
          score: res.score,
          challengesCreated:
            res.challengesCreated === "" ? [] : res.challengesCreated,
          submissions: res.submissions === "" ? [] : res.submissions,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  deleteAccount = (event) => {
    event.preventDefault();

    let password = prompt("Please confirm password");

    fetch("http://localhost:9000/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: jwt_decode(localStorage.getItem("token")).user._id,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          this.setState({ navReady: true });
          localStorage["token"] = "";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  logout = (event) => {
    event.preventDefault();
  };

  componentDidMount() {
    this.callAPI();
  }

  render() {
    if (this.state.navReady) {
      return <Redirect to="/login" />;
    }

    return (
      <div id="userInformation">
        <h2>CodeClash</h2>
        <p>Email: {this.state.email}</p>
        <p>username: {this.state.username}</p>
        <p>Score: {this.state.score}</p>
        <p>
          My Challenges:{" "}
          {this.state.challengesCreated.map((challenge) => (
            <li>{challenge.name}</li>
          ))}
        </p>
        <p>
          My Challenge Submissions:{" "}
          {this.state.submissions.map((submission) => (
            <li>{submission.name}</li>
          ))}
        </p>
        <button className="delAccount" onClick={this.deleteAccount}>
          Delete Account
        </button>
        <button className="logout" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default UserLandingPage;
