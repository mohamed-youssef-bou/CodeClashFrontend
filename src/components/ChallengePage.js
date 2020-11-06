import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import "./ChallengePage.css";

export class ChallengePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeId: this.props.location.state.challengeId,//obtained from the redirect in listAllChallengePage
      challengeName: this.props.location.state.challengeName,//remove this in next sprint
      creatorId: '',
      description: '',
      functionSignature: '',
      localTests: [],
      hiddenTests: [],
      solution: '',
      dateCreated: null,
      dateClosed: null,
      connectedUserName: ''
    }
  }
  //CALLAPI() WILL NOT BE USED FOR THIS SPRINT
  callAPI() {

    fetch('http://localhost:9000/challenges/' + this.state.challengeId)
        .then(res => res.json())
        .then(res => this.setState({
          challengeName: res.challengeName,
          creatorId: res.creatorId,
          description: res.description,
          functionSignature: res.functionSignature,
          localTests: res.localTests,
          hiddenTests: res.hiddenTests,
          solution: res.solution,
          dateCreated: res.dateCreated,
          dateClosed: res.dateClosed
        }))
        .catch(err => {
          console.log(err);
        });
  }

  getConnectedUserName() {
    var _id = jwt_decode(localStorage.getItem("token")).user._id;

    fetch("http://localhost:9000/" + _id)
        .then((res) => res.json())
        .then((res) =>
            this.setState({
              connectedUserName: res.username,
            })
        )
        .catch((err) => {
          console.log(err);
        });
  }

  deleteChallenge = (event) => {
    event.preventDefault();
    let choice = prompt("Are you sure you want to delete this challenge y/n");

    if (choice.toLowerCase() === 'y' || choice.toLowerCase() === 'yes') {
      fetch('http://localhost:9000/deleteChallenge',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          'challengeId': this.state.challengeId,
          'challengeName': this.state.challengeName,
          'author': this.state.connectedUserName
        }

      }).then(res => {
        if(res.status === 201) {
          this.setState({navReady: true});//navigating back to list of challenges page
        }
      }).catch(error => {
        console.log(error);
      })
    } else return;
  }

  checkId = () => {
    const _id = jwt_decode(localStorage.getItem("token")).user._id;
    //for now, setting the state creatorId field to _id as we cannot query the challenge info yet
    //this.state.creatorId = _id;
    //TODO remove above line in NEXT SPRINT
    if (_id === this.state.creatorId) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    //this.callAPI(); NO BACKEND METHOD YET FOR QUERYING CHALLENGE INFO, TO BE DONE NEXT SPRINT
    this.getConnectedUserName();
  }

  render() {
    if (this.state.navReady) {
      return <Redirect to='/challenges' />
    }
    if(this.checkId()){
      return <button color="#FF0000" className="delChallenge" onClick={this.deleteChallenge}>Delete</button>//red
    }
    else {
      return <button color="#808080" className="delChallenge">Delete</button>//gray delete button and does not do anything
    }
    //TODO NEXT SPRINT return ( elements of state);
  }

}


export default ChallengePage;