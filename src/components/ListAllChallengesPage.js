import React, { Component } from "react";
import "./Styles/GeneralStyles.css";
import "./ListAllChallengesPage.css";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LinkButton from "./LinkButton";

export class ListAllChallengesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      challenges: [],
      navChall: false,
      navReady: false,
      selectedChallengeId: "",
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

  navChallenge = (event) => {
    this.setState({ navChall: true });
  };

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

    if (this.state.navChall) {
      return (
        <Redirect
          to={{
            pathname: "/challenge_info",
            state: {
              challengeId: this.state.selectedChallengeId,
            },
          }}
        />
      );
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
            <h1 class="title">Available Challenges</h1>
            <ul class="challengesList">
              {this.state.challenges.map(
                (challenge) => (
                  console.log(challenge),
                  (
                    <li class="challengesListItem">
                      <button
                        class="challengeListButtons"
                        onClick={() => {
                          this.setState({
                            selectedChallengeId: challenge._id,
                          });

                          this.navChallenge();
                        }}
                      >
                        {challenge.challengeName} {/* challenge.name */}
                      </button>
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
export default ListAllChallengesPage;
