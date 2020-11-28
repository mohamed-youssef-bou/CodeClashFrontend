import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import "./ChallengePage.css";
import LinkButton from "./LinkButton";
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
// const webpack = require('./webpack.config');

export class ChallengePage extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props.location.state.creatorId);
        this.state = {
            challengeId: this.props.location.state.challengeId,//obtained from the redirect in QueryChallengeInfoPage
            challengeName: this.props.location.state.challengeName,
            creatorUsername: '',
            description: '',
            functionSignature: '',
            localTests: {
                "input": [],
                "output": [],
            },
            navReady: false,
            submissionCode: '//input code here',
        }
        this.handleExit = this.handleExit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    callAPI() {
        console.log(this.state.challengeName);
        fetch('http://localhost:9000/challenge/' + this.state.challengeName)
            .then(res => res.json())
            .then(res => this.setState({
                creatorUsername: res[1],
                description: res[2],
                functionSignature: res[4],
                localTests: res[5],
                isSubmitted: false,
            }))
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.callAPI();
    }

    handleExit() {
        this.setState({
            navReady: true,
        });
    }

    handleChange(event) {
        event.stopPropagation();
        this.setState({
            submissionCode: event.target.value,
        });
        // console.log(this.state.submissionCode);
    }

    handleSubmit() {

        const _id = jwt_decode(localStorage.getItem("token")).user._id;
        let data = {
            challengeId: this.state.challengeId,
            submissionCode: this.state.submissionCode,
            writerId: _id,
        };

        fetch('http://localhost:9000/submitChallenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.status === 200) {
                this.setState({isSubmitted: true});
            }
        }).catch(error => {
            console.log(error);
        })
    }

    resultPrompt () {
        if(this.state.isSubmitted) {
            //not sure how you (Yoan) want to do the result prompt so just started this method
        }
    }

    render() {
        if (this.state.navReady) {
            return <Redirect
                to={{
                    pathname: "/challenge_info",
                    state: {
                        challengeId: this.state.challengeId,
                        challengeName: this.state.challengeName,
                    },
                }}
            />
        }

        return (
            <div className="massiveContainer">
                <div className="LeftSideChallengeInfo">
                    <h1 className="title-query">{this.state.challengeName}</h1>
                    <div className="LeftchallengeInfoSubcontainer">
                        <div className="SmallLeftchallengeAttributesContainer">
                            <div className="challengePageAttributesItem">
                                Description: {this.state.description}
                            </div>
                            <div className="TestChallengeAttribute">
                                Test Inputs:
                                <ul className="testList">
                                    {this.state.localTests.input.map(
                                        (input) => (
                                            console.log(input),
                                                (
                                                    <li className="testListItem">
                                                        {input}
                                                    </li>
                                                )
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="TestChallengeAttribute">
                                Test outputs:<ul className="testList">
                                {this.state.localTests.output.map(
                                    (output) => (
                                        console.log(output),
                                            (
                                                <li className="testListItem">
                                                    {output}
                                                </li>
                                            )
                                    )
                                )}
                            </ul>
                            </div>
                            <div className="challengePageAttributesItem">Author: {this.state.creatorUsername}</div>
                            <div className="challengePageAttributesItem">Users Attempted: 1337</div>
                        </div>
                        <div className="queryButtonsContainer">
                            <button className="backButton" onClick={this.handleExit}>
                                <img
                                    className="left arrow"
                                    src={require("../assets/leftArrow.png")}
                                />
                                Exit
                                <img
                                    className="right arrow"
                                    src={require("../assets/rightArrow.png")}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="EditorPlaceHolder">
                    <div className="EditorBackground">
                        <textarea style={{width: '100%', height: '100%'}} value={this.state.submissionCode} onChange={this.handleChange} />
                    </div>
                    <div className="queryButtonsContainer">
                        <button className="backButton" onClick={this.handleSubmit}>
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
            </div>
        );
    }
}


export default ChallengePage;