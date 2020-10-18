import React, { Component } from "react";

export class UserLandingPage extends Component {
    state = {
        email: '',
        username: '',
        score: 0,
        challengesCreated: [],
        submissions: [],
        navReady: false
    }

    callAPI() {
        fetch(`/users/[user_id]`)
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

    deleteAccount = (event) => {
        event.preventDefault();
        console.log("delete account pressed");
        fetch(`/deleteUser`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                // "user_id": [user_id], // TODO: insert user_id here,
                // "password": [password] // TODO: insert password here 
            }
        }).then(res => {
            console.log("delete request success");

            if(res.status === 201) {
                this.setState({navReady: true})
            }
        }).catch(error => {
            console.log(error);
        }) 
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        // if(this.state.navReady) {
        //     return <Redirect to='/create_account'/>
        // }
        return (
            <div id="userInformation">
                <h2>CodeClash</h2>
                <p>Email: {this.state.email}</p>
                <p>username: {this.state.username}</p>
                <p>Score: {this.state.score}</p>
                <p>My Challenges: { this.state.challengesCreated.map(challenge => <li>{challenge.name}</li>)}</p>
                <p>My Challenge Submissions: { this.state.submissions.map(submission => <li>{submission.name}</li>)}</p>
                <button class="delAccount" onclick={this.deleteAccount}>Delete Account</button>
            </div>
        );
    }
}

export default UserLandingPage;