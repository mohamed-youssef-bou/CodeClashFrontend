import React, { Component } from "react";
import "./ListAllChallengesPage.css";
import { Redirect } from "react-router-dom";

export class ListAllChallengesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      navChall: false,
      selectedChallengeId: '',
      //TODO CHALLENGE NAME WILL BE AVAILABLE IN CHALLENGEPAGE NEXT SPRINT, REMOVE IT THEN.
      //remove in next sprint
      challengeName: '',
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
    fetch("http://localhost:9000/") //insert correct link
        .then((res) => res.json())
        .then((res) =>
            this.setState({
              challenges: res.challenges,
            })
        )
        .catch((err) => {
          console.log(err);
        });

    this.setState({ challenges: this.fakeChallengeNames });
  }

  componentDidMount() {
    this.callAPI();
  }

  navChallenge = (event) => {
    this.setState({ navChall: true });
  }

  render() {
    if (this.state.navChall) {
      return <Redirect
          to={{
            pathname: "/challenge",
            state: {
              challengeId: this.state.selectedChallengeId,
              //TODO LINE BELOW WILL BE SET IN CHALLENGEPAGE NEXT SPRINT REMOVE IT THEN
              challengeName: this.state.challengeName
            }
          }} />;
    }
    return (
        <div class="challengesPageContainer">
          <div class="logoChallengesPage"></div>
          <div class="challengesPageSubcontainer">
            <h1 class="title">Available Challenges</h1>
            <ul class="challengesList">
              {/* {this.state.challenges.map((challenge) => (
              <li class="challengesListItem">{challenge.name}</li>
            ))} */}
              {this.state.challenges.map((challenge) => (
                  <li class="challengesListItem">
                    <button class="challengeListButtons" onClick={ () => {

                      this.setState({ selectedChallengeId: challenge._id,
                        //TODO REMOVE CHALLENGE NAME IN NEXT SPRINT
                        challengeName: challenge.name});

                      this.navChallenge();}}>
                      {challenge}
                    </button>
                  </li>
              ))}
            </ul>
          </div>
        </div>
    );
  }
}
export default ListAllChallengesPage;
