import React, { Component } from "react";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';

export class UserLoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {username: '', password: '', navReady: false};

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateUsername(event){
        this.setState({username: event.target.value});
    }

    updatePassword(event){
        this.setState({password: event.target.value});
    }

    async handleSubmit(event) {

        event.preventDefault();

        var isRedirect = false;

        let data = {
            'username': this.state.username,
            'password': this.state.password
          };
          console.log(JSON.stringify(data));
        await fetch('http://localhost:9000/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }) // Login with body parameters: username and password
            .then((res) => {
                if(res.status === 200){
                    isRedirect = true;  
                }
                return res.json();
        })
        .then(data => localStorage["token"] = data["token"])
        .catch(err => console.log(err));
        
        this.setState({navReady: true}) 
    }

    render() {
        if (this.state.navReady) {
            return <Redirect to='/landing_page' />
        }
        return (
            <div id="loginForm">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    {/* Username */}
                    <label className="sr-only" htmlFor="usernameInput">Username</label>
                    <input type="name" className="form-control mb-2 mr-sm-2" id="usernameInput" placeholder="Username" value={this.state.username} onChange={this.updateUsername}></input>

                    {/* Password */}
                    <label className="sr-only" htmlFor="passwordInput">Password</label>
                    <div className="input-group mb-2 mr-sm-2">
                        <input type="password" className="form-control" id="passwordInput" placeholder="Password" value={this.state.password} onChange={this.updatePassword}></input>
                    </div>

                    <button type="submit" className="btn btn-primary mb-2">Login</button>
                </form>
            </div>
        );
    }
}

export default UserLoginPage;
