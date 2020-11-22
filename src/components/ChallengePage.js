import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import "./ChallengePage.css";
import LinkButton from "./LinkButton";

export class ChallengePage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state.creatorId);
        this.state = {
            challengeId: this.props.location.state.challengeId,//obtained from the redirect in QueryChallengeInfoPage
            challengeName: '',
            creatorId: '',
            description: '',
            functionSignature: '',
            localTests: [],
            hiddenTests: [],
            solution: '',
            connectedUserName: this.props.location.state.connectedUserName, //obtained from redirect in QueryChallengeInfoPage
            navReady: false,
            submissionCode: '',
        }
        this.handleExit = this.handleExit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                connectedUserName: '',
                isSubmitted: false,
            }))
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        //this.callAPI(); NO BACKEND METHOD YET FOR QUERYING CHALLENGE INFO, TO BE DONE NEXT SPRINT
    }

    handleExit() {
        this.setState({
            navReady: true,
        });
    }

    handleSubmit() {


        let data = {
            challengeId: this.state.challengeId,
            submissionCode: this.state.submissionCode,
            author: this.state.connectedUserName
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
                    },
                }}
            />
        }

        return (
            <div className="massiveContainer">
                <div className="LeftSideChallengeInfo">
                    <h1 className="title-query">Challenge Name{/*this.state.challengeName*/}</h1>
                    <div className="LeftchallengeInfoSubcontainer">
                        <div className="SmallLeftchallengeAttributesContainer">
                            <div className="challengePageAttributesItem">
                                Description: {this.state.description}
                            </div>
                            <div className="TestChallengeAttribute">
                                Test Inputs:
                                <ul className="testList">
                                    {this.state.localTests.map(
                                        (test) => (
                                            console.log(test),
                                                (
                                                    <li className="testListItem">
                                                        {test.input}
                                                    </li>
                                                )
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="TestChallengeAttribute">
                                Test outputs:<ul className="testList">
                                {this.state.localTests.map(
                                    (test) => (
                                        console.log(test),
                                            (
                                                <li className="testListItem">
                                                    {test.output}
                                                </li>
                                            )
                                    )
                                )}
                            </ul>
                            </div>
                            <div className="challengePageAttributesItem">Author: {this.getCreatorName}</div>
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