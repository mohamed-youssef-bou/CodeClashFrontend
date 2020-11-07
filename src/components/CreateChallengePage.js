import React, { Component } from "react";
import "./ListAllChallengesPage.css";
import "./CreateChallengePage.css";
import jwt_decode from "jwt-decode";
import LinkButton from "./LinkButton";
import UserLandingPage from "./UserLandingPage";
import {Redirect} from "react-router-dom";

export class CreateChallengePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      language: "language",
      navReady: false,
    };

    this.handleLanguageChange = this.handleLanguageChange.bind(this);

  }

  handleLanguageChange(event) {
    this.setState({ language: event.target.value });
  }

  getUsername() {
    var _id = jwt_decode(localStorage.getItem("token")).user._id;

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

  logout = (event) => {
    event.preventDefault();
    localStorage.setItem("token", "");
    console.log("token " + localStorage.getItem("token"));
    this.setState({ navReady: true });
  };

  componentDidMount() {
    this.getUsername();
  }

  render() {
    if (this.state.navReady) {
      return <Redirect to="/login" />;
    }

    return (
      <div class="massiveContainer">
        <div class="navLeft">
          <div class="profilePicture"></div>
          <h1 class="username">{this.state.username}</h1>
          <ul className="navBarList">
            <li className="navBarListItem">
              <div className="icon updateProfileIcon"></div>
              <LinkButton className="navBarButton" to="/update">Update Profile</LinkButton>
            </li>
            <li className="navBarListItem">
              <div className="icon listChallengesIcon"></div>
              <LinkButton className="navBarButton" to="/challenges">List Challenges</LinkButton>
            </li>
            <li className="navBarListItem">
              <div className="icon logoutIcon"></div>
              <button className="navBarButton" onClick={this.logout}>Logout</button>
            </li>
          </ul>
        </div>
        <div class="challengesPageContainer">
          <div class="logoChallengesPage"></div>
          <h1 class="title-create">Create Challenge</h1>
          <div class="createChallengePageSubcontainer">
            <div class="createChallengePageInputFields">
              <input class="challengeNameInput create-input"></input>
              <input class="challengeDescriptionInput  create-input"></input>
              <select
                class="challengeLanguageSelector"
                value={this.state.language}
                onChange={this.handleLanguageChange}
              >
                <option class="challengeLanguageOption" value="java">
                  Java
                </option>
                <option class="challengeLanguageOption" value="javascript">
                  Javascript
                </option>
                <option class="challengeLanguageOption" value="python">
                  Python
                </option>
              </select>
              <input class="challengeSignatureInput create-input"></input>
            </div>
            <div class="createChallengeTestsContainer">
              <div class="localTestsContainer">
                <label class="test-label">Local Tests</label>
                <div class="localTestsSubcontainer">
                  <div class="localTestsEntryContainer">
                    <input class="localTestInput create-input test-input"></input>
                    <input class="localTestOutput create-input test-input"></input>
                  </div>
                  <div class="localTestsEntryContainer">
                    <input class="localTestInput create-input test-input"></input>
                    <input class="localTestOutput create-input test-input"></input>
                  </div>
                  <div class="localTestsEntryContainer">
                    <input class="localTestInput create-input test-input"></input>
                    <input class="localTestOutput create-input test-input"></input>
                  </div>
                </div>
              </div>
              <div class="hiddenTestsContainer">
                <label class="test-label">Hidden Tests</label>
                <div class="hiddenTestsSubcontainer">
                  <div class="hiddenTestsEntryContainer">
                    <input class="hiddenTestInput create-input test-input"></input>
                    <input class="hiddenTestOutput create-input test-input"></input>
                  </div>
                  <div class="hiddenTestsEntryContainer">
                    <input class="hiddenTestInput create-input test-input"></input>
                    <input class="hiddenTestOutput create-input test-input"></input>
                  </div>
                  <div class="hiddenTestsEntryContainer">
                    <input class="hiddenTestInput create-input test-input"></input>
                    <input class="hiddenTestOutput create-input test-input"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="submitButton">
            <img
              className="left arrow"
              src={require("../assets/leftArrow.png")}
            />
            Submit
            <img
              className="right arrow"
              src={require("../assets/rightArrow.png")}
            />
          </button>
        </div>
      </div>
    );
  }
}
export default CreateChallengePage;
