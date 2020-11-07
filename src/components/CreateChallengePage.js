import React, { Component } from "react";
import "./ListAllChallengesPage.css";
import "./CreateChallengePage.css";

export class CreateChallengePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "language",
    };

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleLanguageChange(event) {
    this.setState({ language: event.target.value });
  }

  render() {
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
