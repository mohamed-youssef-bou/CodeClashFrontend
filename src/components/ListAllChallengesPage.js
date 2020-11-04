import React, { Component } from "react";
import "./ListAllChallengesPage.css";

export class ListAllChallengesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
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

  render() {
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
              <li class="challengesListItem">{challenge}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default ListAllChallengesPage;
