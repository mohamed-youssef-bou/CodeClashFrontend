import React, { Component } from "react";
import "./ListAllChallengesPage.css";
import "./CreateChallengePage.css";
import jwt_decode from "jwt-decode";
import LinkButton from "./LinkButton";
import {Redirect} from "react-router-dom";

export class CreateChallengePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      creatorID: "",
      challengeTitle: "",
      description: "",
      language: "language",
      funcSignature: "",

      localTestInput1: "",
      localTestInput2: "",
      localTestInput3: "",
      localTestOutput1: "",
      localTestOutput2: "",
      localTestOutput3: "",

      hiddenTestInput1: "",
      hiddenTestInput2: "",
      hiddenTestInput3: "",
      hiddenTestOutput1: "",
      hiddenTestOutput2: "",
      hiddenTestOutput3: "",

      navReady: false,
      navListChallenges: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleFuncSignatureChange = this.handleFuncSignatureChange.bind(this);
    this.handleLocalTestInputChange = this.handleLocalTestInputChange.bind(this);
    this.handleLocalTestOutputChange = this.handleLocalTestOutputChange.bind(this);
    this.handleHiddenTestInputChange = this.handleHiddenTestInputChange.bind(this);
    this.handleHiddenTestOutputChange = this.handleHiddenTestOutputChange.bind(this);
    this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ challengeTitle: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleLanguageChange(event) {
    this.setState({ language: event.target.value });
  }

  handleFuncSignatureChange(event) {
    this.setState({ funcSignature: event.target.value });
  }

  handleLocalTestInputChange(event) {
    switch (event.target.id) {
      case "localTestInput1":
        this.setState({ localTestInput1: event.target.value });
        break;

      case "localTestInput2":
        this.setState({ localTestInput2: event.target.value });
        break;

      case "localTestInput3":
        this.setState({ localTestInput3: event.target.value });
        break;
    }
  }

  handleLocalTestOutputChange(event) {
      switch (event.target.id) {
        case "localTestOutput1":
          this.setState({ localTestOutput1: event.target.value });
          break;

        case "localTestOutput2":
          this.setState({ localTestOutput2: event.target.value });
          break;

        case "localTestOutput3":
          this.setState({ localTestOutput3: event.target.value });
          break;
      }
    }

  handleHiddenTestInputChange(event) {
    switch (event.target.id) {
      case "HiddenTestInput1":
        this.setState({ HiddenTestInput1: event.target.value });
        break;

      case "HiddenTestInput2":
        this.setState({ HiddenTestInput2: event.target.value });
        break;

      case "HiddenTestInput3":
        this.setState({ HiddenTestInput3: event.target.value });
        break;
    }
  }

  handleHiddenTestOutputChange(event) {
      switch (event.target.id) {
        case "HiddenTestOutput1":
          this.setState({ HiddenTestOutput1: event.target.value });
          break;

        case "HiddenTestOutput2":
          this.setState({ HiddenTestOutput2: event.target.value });
          break;

        case "HiddenTestOutput3":
          this.setState({ HiddenTestOutput3: event.target.value });
          break;
      }
    }

  getUsername() {
    var _id = jwt_decode(localStorage.getItem("token")).user._id;

    fetch("http://localhost:9000/" + _id)
        .then((res) => res.json())
        .then((res) =>
            this.setState({
              username: res.username,
              creatorID: _id,
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

  handleSubmitCreate(event) {
    event.preventDefault();

    let localTestJson = [{input: this.state.localTestInput1, output: this.state.localTestOutput1}]
    let hiddenTestJson = [{input: this.state.hiddenTestInput1, output: this.state.hiddenTestOutput1}]
    
    if(this.state.localTestInput2 !== "" && this.state.localTestOutput2 !== ""){
      localTestJson.push({input: this.state.localTestInput2, output: this.state.localTestOutput2})
    }

    if(this.state.localTestInput3 !== "" && this.state.localTestOutput3 !== ""){
      localTestJson.push({input: this.state.localTestInput3, output: this.state.localTestOutput3})
    }
    
    if(this.state.hiddenTestInput2 !== "" && this.state.hiddenTestOutput2 !== ""){
      hiddenTestJson.push({input: this.state.hiddenTestInput2, output: this.state.hiddenTestOutput2})
    }
    
    if(this.state.hiddenTestInput3 !== "" && this.state.hiddenTestOutput3 !== ""){
      hiddenTestJson.push({input: this.state.hiddenTestInput3, output: this.state.hiddenTestOutput3})
    }

    let data = {
      user_id: jwt_decode(localStorage.getItem("token")).user._id,
      name: this.state.challengeTitle,
      id: this.state.creatorID,
      description: this.state.description,
      language: this.state.language,
      funcSignature: this.state.funcSignature,
      localTests: JSON.stringify(localTestJson),
      hiddenTests: JSON.stringify(hiddenTestJson),
      solution: "placeholder", //TODO: remove placeholder in next sprint
    };

    fetch("/createChallenge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    //set error text to display
    this.setState({
      navListChallenges: true,
    });
  }

  componentDidMount() {
    this.getUsername();
  }

  render() {
    if (this.state.navReady) {
      return <Redirect to="/login" />;
    }

    if (this.state.navListChallenges) {
      return <Redirect to="/challenges" />;
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
              <input class="challengeNameInput create-input"
                     placeholder="Challenge title"
                     value={this.state.challengeTitle}
                     onChange={this.handleTitleChange}/>
              <input class="challengeDescriptionInput  create-input"
                     placeholder="Description"
                     value={this.state.description}
                     onChange={this.handleDescriptionChange}/>
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
              <input class="challengeSignatureInput create-input"
                     placeholder="Function signature"
                     value={this.state.funcSignature}
                     onChange={this.handleFuncSignatureChange}/>
            </div>
            <div class="createChallengeTestsContainer">
              <div class="localTestsContainer">
                <label class="test-label">Local Tests</label>
                <div class="localTestsSubcontainer">
                  <div class="localTestsEntryContainer">
                    <input class="localTestInput create-input test-input"
                           placeholder="Input"
                           value={this.state.localTestInput1}
                           id="localTestInput1"
                           onChange={this.handleLocalTestInputChange}/>
                    <input class="localTestOutput create-input test-input"
                           placeholder="Output"
                           value={this.state.localTestOutput1}
                           id="localTestOutput1"
                           onChange={this.handleLocalTestOutputChange}/>
                  </div>
                  <div class="localTestsEntryContainer">
                    <input class="localTestInput create-input test-input"
                           placeholder="Input"
                           value={this.state.localTestInput2}
                           id="localTestInput2"
                           onChange={this.handleLocalTestInputChange}/>
                    <input class="localTestOutput create-input test-input"
                           placeholder="Output"
                           value={this.state.localTestOutput2}
                           id="localTestOutput2"
                           onChange={this.handleLocalTestOutputChange}/>
                  </div>
                  <div class="localTestsEntryContainer">
                    <input class="localTestInput create-input test-input"
                           placeholder="Input"
                           value={this.state.localTestInput3}
                           id="localTestInput3"
                           onChange={this.handleLocalTestInputChange}/>
                    <input class="localTestOutput create-input test-input"
                           placeholder="Output"
                           value={this.state.localTestOutput3}
                           id="localTestOutput3"
                           onChange={this.handleLocalTestOutputChange}/>
                  </div>
                </div>
              </div>
              <div class="hiddenTestsContainer">
                <label class="test-label">Hidden Tests</label>
                <div class="hiddenTestsSubcontainer">
                  <div class="hiddenTestsEntryContainer">
                    <input class="hiddenTestInput create-input test-input"
                           placeholder="Input"
                           value={this.state.HiddenTestInput1}
                           id="HiddenTestInput1"
                           onChange={this.handleHiddenTestInputChange}/>
                    <input class="hiddenTestOutput create-input test-input"
                           placeholder="Output"
                           value={this.state.HiddenTestOutput1}
                           id="HiddenTestOutput1"
                           onChange={this.handleHiddenTestOutputChange}/>
                  </div>
                  <div class="hiddenTestsEntryContainer">
                    <input class="hiddenTestInput create-input test-input"
                           placeholder="Input"
                           value={this.state.HiddenTestInput2}
                           id="HiddenTestInput2"
                           onChange={this.handleHiddenTestInputChange}/>
                    <input class="hiddenTestOutput create-input test-input"
                           placeholder="Output"
                           value={this.state.HiddenTestOutput2}
                           id="HiddenTestOutput2"
                           onChange={this.handleHiddenTestOutputChange}/>
                  </div>
                  <div class="hiddenTestsEntryContainer">
                    <input class="hiddenTestInput create-input test-input" 
                           placeholder="Input"
                           value={this.state.HiddenTestInput3}
                           id="HiddenTestInput3"
                           onChange={this.handleHiddenTestInputChange}/>
                    <input class="hiddenTestOutput create-input test-input"
                           placeholder="Output"
                           value={this.state.HiddenTestOutput3}
                           id="HiddenTestOutput3"
                           onChange={this.handleHiddenTestOutputChange}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="submitButton" onClick={this.handleSubmitCreate}>
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
