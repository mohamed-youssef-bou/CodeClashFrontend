import React, { Component } from "react";
import "./ListAllChallengesPage.css";

export class ListAllChallengesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
    };
  }

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
          <div class="challengesList">
            {this.state.challenges.map((challenge) => (
              <li>{challenge.name}</li>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default ListAllChallengesPage;
