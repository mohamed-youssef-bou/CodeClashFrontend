import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import "../components/Styles/GeneralStyles.css";
import "./QueryChallengeInfoPage.css";
import LinkButton from "./LinkButton";

export class QueryChallengeInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeId: this.props.location.state.challengeId, //obtained from the redirect in listAllChallengePage
      challengeName: this.props.location.state.challengeName, //obtained from the redirect in listAllChallengePage
      creatorId: "",
      author: "",
      description: "",
      dateClosed: null,
      connectedUserName: "",
      navBack: false,
      startChallenge: false,
    };

    this.handleBack = this.handleBack.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  callAPI() {
    fetch("http://localhost:9000/challenge/" + this.state.challengeName)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          author: res[1],
          description: res[2],
        })
      )
      .catch((err) => {
        console.log(err);
      });
    console.log(this.state);
  }

  closeChallenge = (event) => {
    event.preventDefault();

    let data = {
      challengeId: this.state.challengeId,
      creatorId: this.state.creatorId,
      challengeName: this.state.challengeName,
    };

    fetch("http://localhost:9000/closeChallenge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 201) {
          this.setState({ navBack: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteChallenge = (event) => {
    event.preventDefault();
    let choice = prompt("Are you sure you want to delete this challenge y/n");
    if (choice.toLowerCase() === "y" || choice.toLowerCase() === "yes") {
      let data = {
        challengeId: this.state.challengeId,
        challengeName: this.state.challengeName,
        author: this.state.connectedUserName,
      };

      fetch("http://localhost:9000/deleteChallenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ navBack: true }); //navigating back to list of challenges page
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else return;
  };

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
    this.callAPI();
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
      return "Challenge has already been closed.";
    }
    this.setState({
      startChallenge: true,
    });
  }

  ChallengeInfoButtons() {
    const checkId = this.checkId();
    if (checkId) {
      return (
        <div className="queryButtonsContainer">
          <button className="backButton" onClick={this.deleteChallenge}>
            <img
              className="left arrow"
              src={require("../assets/leftArrow.png")}
            />
            Delete
            <img
              className="right arrow"
              src={require("../assets/rightArrow.png")}
            />
          </button>
          <button className="deleteButton" onClick={this.closeChallenge}>
            <img
              className="left arrow"
              src={require("../assets/leftArrow.png")}
            />
            Close
            <img
              className="right arrow"
              src={require("../assets/rightArrow.png")}
            />
          </button>
          <button className="closeButton" onClick={this.handleBack}>
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
        </div>
      );
    }
    return (
      <div className="queryButtonsContainer">
        <button className="backButton" onClick={this.handleStart}>
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
        <button className="startButton" onClick={this.handleBack}>
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
      </div>
    );
  }

  render() {
    if (this.state.navBack) {
      return <Redirect to="/challenges" />;
    } else if (this.state.startChallenge) {
      return (
        <Redirect
          to={{
            pathname: "/challenge",
            state: {
              challengeId: this.state.challengeId,
            },
          }}
        />
      );
    }
    return (
      <div className="massiveContainer">
        <div className="navLeft">
          <div className="profilePicture"></div>
          <h1 className="username">{this.state.connectedUserName}</h1>
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
        <div className="rightsidePageContainer">
          <div className="logoChallengesPage"></div>
          <h1 className="title-query">{this.state.challengeName}</h1>
          <div className="challengeInfoSubcontainer">
            <div className="challengeAttributesContainer">
              <div className="challengeAttributesItem">
                Description: {this.state.description}
              </div>
              <div className="challengeAttributesItem">
                Author: {this.state.author}
              </div>
            </div>
            {this.ChallengeInfoButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default QueryChallengeInfoPage;
