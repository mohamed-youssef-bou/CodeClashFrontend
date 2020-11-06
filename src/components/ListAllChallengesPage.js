import React, { Component } from "react";
import "./ListAllChallengesPage.css";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

export class ListAllChallengesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      navChall: false,
      selectedChallengeId: "",
      //TODO CHALLENGE NAME/ CREATOR ID WILL BE AVAILABLE IN CHALLENGEPAGE NEXT SPRINT, REMOVE IT THEN.
      //remove in next sprint
      challengeName: "",
      selectedChallengeCreatorId: "",
    };
  }

  //for testing purposes
  fakeChallengeNames = [
    "challengeA",
    "challengeB",
    "MazeMania",
    "Couldn't create JS objects",
    "Angular Memes",
  ];
  callAPI() {
    // const _id = jwt_decode(localStorage.getItem("token")).user._id;
    // fetch("http://localhost:9000/challenges/:" + _id)
    //   .then((res) => res.json())
    //   .then((res) =>
    //     this.setState({
    //       challenges: res.challenges,
    //     })
    //   )
    //   .catch((err) => {
    //     console.log(err);
    //   });

    this.setState({ challenges: this.fakeChallengeNames });
    console.log(this.state.challenges);
  }

  componentDidMount() {
    this.callAPI();
  }

  navChallenge = (event) => {
    this.setState({ navChall: true });
  };

  render() {
    if (this.state.navChall) {
      return (
        <Redirect
          to={{
            pathname: "/challenge",
            state: {
              challengeId: this.state.selectedChallengeId,
              //TODO LINE BELOW WILL BE SET IN CHALLENGEPAGE NEXT SPRINT REMOVE IT THEN
              challengeName: this.state.challengeName,
              creatorId: this.state.selectedChallengeCreatorId,
            },
          }}
        />
      );
    }
    return (
      <div class="massiveContainer">
        <div class="navLeft">
          <div class="profilePicture"></div>
          <h1 class="username">Fake Username</h1>
          <ul class="navBarList">
            <li class="navBarListItem">
              <div class="icon updateProfileIcon"></div>
              <button class="navBarButton">Update Profile</button>
            </li>
            <li class="navBarListItem">
              <div class="icon createChallengeIcon"></div>
              <button class="navBarButton">Create Challenge</button>
            </li>
            <li class="navBarListItem">
              <div class="icon listChallengesIcon"></div>
              <button class="navBarButton">List Challenges</button>
            </li>
            <li class="navBarListItem">
              <div class="icon logoutIcon"></div>
              <button class="navBarButton">Logout</button>
            </li>
          </ul>
        </div>
        <div class="challengesPageContainer">
          <div class="logoChallengesPage"></div>
          <div class="challengesPageSubcontainer">
            <h1 class="title">Available Challenges</h1>
            <ul class="challengesList">
              {this.state.challenges.map((challenge) => (
                <li class="challengesListItem">
                  <button
                    class="challengeListButtons"
                    onClick={() => {
                      this.setState({
                        selectedChallengeId: challenge._id,
                        //TODO REMOVE CHALLENGE NAME IN NEXT SPRINT
                        challengeName: challenge.name,
                        creatorId: this.state.selectedChallengeCreatorId,
                      });

                      this.navChallenge();
                    }}
                  >
                    {challenge} {/* challenge.name */}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default ListAllChallengesPage;
