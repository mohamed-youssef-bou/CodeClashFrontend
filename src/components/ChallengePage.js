import React, { Component } from "react";
import "./ChallengePage.css";

export class ChallengePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: null,
    };
  }

  callAPI() {
    fetch("http://localhost:9000/") //insert correct link
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          challenge: res.challenge,
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
      <div class="challengePageContainer">
        <h1 class="title">Challenge Name</h1>
        <div> Challenge Description...</div>
      </div>
    );
  }
}
export default ChallengePage;
