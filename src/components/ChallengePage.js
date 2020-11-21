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
            challengeName: '',
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

    componentDidMount() {
        //this.callAPI(); NO BACKEND METHOD YET FOR QUERYING CHALLENGE INFO, TO BE DONE NEXT SPRINT
    }

    render() {
        if (this.state.navReady) {
            return <Redirect
                to={{
                    pathname: "/challenge_info",
                    state: {
                        challengeId: this.state.challengeId,
                    },
                }}
            />
        }
    }

}


export default ChallengePage;