import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import "../components/Styles/GeneralStyles.css";
import "./QueryChallengeInfoPage.css";
import LinkButton from "./LinkButton";

export class QueryChallengeInfoPage extends Component {
  constructor(props) {
    super(props);
    //console.log(this.props.location.state.creatorId);
    this.state = {
      //challengeId: this.props.location.state.challengeId, //obtained from the redirect in listAllChallengePage
      //challengeName: this.props.location.state.challengeName, //remove this in next sprint
      //creatorId: this.props.location.state.creatorId, //remove this in next sprint
      description: "",
      functionSignature: "",
      localTests: [],
      hiddenTests: [],
      solution: "",
      dateCreated: null,
      dateClosed: null,
      connectedUserName: "",
      navBack: false,
    };

    this.handleBack = this.handleBack.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  callAPI() {
    fetch("http://localhost:9000/challenges/" + this.state.challengeId)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          challengeName: res.challengeName,
          creatorId: res.creatorId,
          description: res.description,
          functionSignature: res.functionSignature,
          localTests: res.localTests,
          hiddenTests: res.hiddenTests,
          solution: res.solution,
          dateCreated: res.dateCreated,
          dateClosed: res.dateClosed,
          connectedUserName: "",
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  getConnectedUserName() {
    var _id = jwt_decode(localStorage.getItem("token")).user._id;

    fetch("http://localhost:9000/" + _id)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          connectedUserName: res.username,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkId = () => {
    const _id = jwt_decode(localStorage.getItem("token")).user._id;
    if (_id === this.state.creatorId) {
      return true;
    }
    return false;
  };

  componentDidMount() {
    //this.callAPI(); NO BACKEND METHOD YET FOR QUERYING CHALLENGE INFO, TO BE DONE NEXT SPRINT
    this.getConnectedUserName();
  }

  handleBack(event) {
    event.preventDefault();
    this.setState({ navBack: true });
  }

  // Check conditions for starting a challenge
  handleStart(event) {
    event.preventDefault();
    if (this.checkId()) {
      return "Creator of Challenge cannot start challenge."; 
    }
    if (this.state.dateClosed != null) {
      return "Challenge has already been closed."
    }
    console.log("STAAAART");
  }

  render() {
    if (this.state.navBack) {
      return <Redirect to="/challenges" />;
    }

    // if (this.checkId()) {
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
        <div class="rightsidePageContainer">
          <div class="logoChallengesPage"></div>
          <h1 class="title-query">Challenge Name</h1>
          <div class="challengeInfoSubcontainer">
            <div class="challengeAttributesContainer">
              <div class="challengeAttributesItem">
                Description: insert some description
              </div>
              <div class="challengeAttributesItem">
                Author: insert some description
              </div>
              <div class="challengeAttributesItem">Users Attempted: 1337</div>
            </div>
            <div class="queryButtonsContainer">
              <button class="backButton" onClick={this.handleBack}>
                <img
                  className="left arrow"
                  src={require("../assets/leftArrow.png")}
                />
                Back
                <img
                  className="right arrow"
                  src={require("../assets/rightArrow.png")}
                />
              </button>
              <button class="startButton" onClick={this.handleStart}>
                <img
                  className="left arrow"
                  src={require("../assets/leftArrow.png")}
                />
                Start
                <img
                  className="right arrow"
                  src={require("../assets/rightArrow.png")}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//}

export default QueryChallengeInfoPage;
