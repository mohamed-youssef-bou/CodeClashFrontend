import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import "./ChallengePage.css";

export class ChallengePage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state.creatorId);
        this.state = {
            challengeId: this.props.location.state.challengeId,//obtained from the redirect in listAllChallengePage
            challengeName: this.props.location.state.challengeName,//remove this in next sprint
            creatorId: this.props.location.state.creatorId,//remove this in next sprint
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
                dateClosed: res.dateClosed,
                connectedUserName: '',
            }))
            .catch(err => {
                console.log(err);
            });
    }

    getConnectedUserName() {
        var _id = jwt_decode(localStorage.getItem("token")).user._id;

        fetch("http://localhost:9000/" + _id)
            .then((res) => res.json())
            .then((res) =>{
                    this.setState({
                        connectedUserName: res.username,
                    });
                }

            )
            .catch((err) => {
                console.log(err);
            });
    }

    closeChallenge = (event) => {
        event.preventDefault();

        let data = {
            challengeId: this.state.challengeId,
            creatorId: this.state.creatorId,
            challengeName: this.state.challengeName
        }

        fetch('http://localhost:9000/closeChallenge', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then( res => {
                if(res.status === 201) {
                    this.setState({navReady: true});
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    deleteChallenge = (event) => {
        event.preventDefault();
        let choice = prompt("Are you sure you want to delete this challenge y/n");
        if (choice.toLowerCase() === 'y' || choice.toLowerCase() === 'yes') {

            let data = {
                challengeId: this.state.challengeId,
                challengeName: this.state.challengeName,
                author: this.state.connectedUserName
            };

            fetch('http://localhost:9000/deleteChallenge',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then(res => {
                if(res.status === 200) {
                    this.setState({navReady: true});//navigating back to list of challenges page
                }
            }).catch(error => {
                console.log(error);
            })
        } else return;
    }

    checkId = () => {
        const _id = jwt_decode(localStorage.getItem("token")).user._id;
        if (_id === this.state.creatorId) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        //this.callAPI(); NO BACKEND METHOD YET FOR QUERYING CHALLENGE INFO, TO BE DONE NEXT SPRINT
        this.getConnectedUserName()
    }

    render() {
        if (this.state.navReady) {
            return <Redirect to='/challenges' />
        }

        if(this.checkId()){
            return(
                <div>
                    <button type="submit" className="btn btn-danger mb-2 mx-2" onClick={this.deleteChallenge}>Delete</button>
                    <button type="submit" className="btn btn-info mb-2 mx-2" onClick={this.closeChallenge}>Close</button>
                </div>
            )
        }
    }

}


export default ChallengePage;