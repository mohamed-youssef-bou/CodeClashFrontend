import React, { Component } from "react";
import "./Styles/GeneralStyles.css";
import "./ListAllChallengesPage.css";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LinkButton from "./LinkButton";

export class LeaderBoardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      users: [
        "Big boi - 999999",
        "Barrack - 2012",
        "Matumba - 24",
        "Alex :( - 0",
      ],
      navReady: false,
    };
  }

  callAPI() {
    const _id = jwt_decode(localStorage.getItem("token")).user._id;

    fetch("http://localhost:9000/challenges/:" + _id)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          challenges: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.state.challenges);

    fetch("http://localhost:9000/" + _id)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          username: res.username,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.callAPI();
  }

  logout = (event) => {
    event.preventDefault();
    localStorage.setItem("token", "");
    console.log("token " + localStorage.getItem("token"));
    this.setState({ navReady: true });
  };

  render() {
    if (this.state.navReady) {
      return <Redirect to="/login" />;
    }

    return (
      <div class="massiveContainer">
        <div class="navLeft">
          <div class="profilePicture"></div>
          <h1 className="username">{this.state.username}</h1>
          <ul className="navBarList">
            <li className="navBarListItem">
              <div className="icon updateProfileIcon"></div>
              <LinkButton className="navBarButton" to="/update">
                Update Profile
              </LinkButton>
            </li>
            <li className="navBarListItem">
              <div className="icon listChallengesIcon"></div>
              <LinkButton className="navBarButton" to="/challenges">
                List Challenges
              </LinkButton>
            </li>
            <li className="navBarListItem">
              <div className="icon createChallengeIcon"></div>
              <LinkButton className="navBarButton" to="/create_challenge">
                Create Challenge
              </LinkButton>
            </li>
            <li className="navBarListItem">
              <div className="icon logoutIcon"></div>
              <button className="navBarButton" onClick={this.logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div class="challengesPageContainer">
          <div class="logoChallengesPage"></div>
          <div class="challengesPageSubcontainer">
            <h1 class="title">LeaderBoard</h1>
            <ul class="challengesList">
              {this.state.users.map(
                //change this part when u add in Backend call
                (user) => (
                  console.log(user),
                  (
                    <li class="challengesListItem">
                      <div class="userListLabels">{user}</div>
                    </li>
                  )
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default LeaderBoardPage;
