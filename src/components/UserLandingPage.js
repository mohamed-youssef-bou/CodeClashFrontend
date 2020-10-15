import React, { Component } from "react";



export class UserLandingPage extends Component {
    state = {
        email: '',
        username: '',
        score: 0,
        challengesCreated: [],
        submissions: []
    }

    callAPI() {
        fetch(`http://localhost:9000/users/[user_id]`)//TODO add the user id here
            .then(res => res.text())
            .then(res => this.setState({
                email: res.data.email,
                username: res.data.username,
                score: res.data.score,
                challengesCreated: res.data.challengesCreated,
                submissions: res.data.submissions
            }))
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div id="userInformation">
                <h2>CodeClash</h2>
                <p>Email: {this.state.email}</p>
                <p>username: {this.state.username}</p>
                <p>Score: {this.state.score}</p>
                <p>My Challenges: { this.state.challengesCreated.map(challenge => <li>{challenge.name}</li>)}</p>
                <p>My Challenge Submissions: { this.state.submissions.map(submission => <li>{submission.name}</li>)}</p>
            </div>
        );
    }
}

export default UserLandingPage;