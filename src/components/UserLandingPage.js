import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import LinkButton from "./LinkButton";
import "./ListAllChallengesPage.css";
import "./CreateChallengePage.css";

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
          localStorage.setItem("token", "");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  redirectToChallengesList = (event) => {
    this.setState({goToChallenges : false});
  };

  logout = (event) => {
    event.preventDefault();
    localStorage.setItem("token", "");
    console.log("token " + localStorage.getItem("token"));
    this.setState({ navReady: true });
  };

  componentDidMount() {
    this.callAPI();
  }

  render() {
    if (this.state.navReady) {
      return <Redirect to="/login" />;
    }

    if (this.state.goToChallenges) {
      return <Redirect to="/challenges" />;
    }

    return (
        <div className="massiveContainer">
            <div className="navLeft">
                <div className="profilePicture"></div>
                <h1 className="username">{this.state.username}</h1>
                <ul className="navBarList">
                    <li className="navBarListItem">
                        <div className="icon updateProfileIcon"></div>
                        <LinkButton className="navBarButton" to="/update">Update Profile</LinkButton>
                    </li>
                    <li className="navBarListItem">
                        <div className="icon createChallengeIcon"></div>
                        <LinkButton className="navBarButton" to="/create_challenge">Create Challenge</LinkButton>
                    </li>
                    <li className="navBarListItem">
                        <div className="icon listChallengesIcon"></div>
                        <LinkButton className="navBarButton" to="/challenges">List Challenges</LinkButton>
                    </li>
                    <li className="navBarListItem">
                        <div className="icon listChallengesIcon"></div>
                        <LinkButton className="navBarButton" to="/leaderboard">Leaderboard</LinkButton>
                    </li>
                    <li className="navBarListItem">
                        <div className="icon logoutIcon"></div>
                        <button className="navBarButton" onClick={this.logout}>Logout</button>
                    </li>
                </ul>
            </div>
            <div className="rightBackgroundContainer"></div>
        </div>
    );
  }
}

export default UserLandingPage;
