import React, { Component } from "react";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export class UserLoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    
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

    handleSubmit(_) {
        alert('Username is: ' + this.state.username + ' | Password is: ' + this.state.password);
       
        fetch(`http://localhost:9000/login`, {
            method: 'POST',
            body: JSON.stringify(this.state)
        }) // Login with body parameters: username and password
            .then(res => console.log(res))
            // TODO store JWT token
            .catch(err => err);
    }

    render() {
        return (
            <div id="loginForm">
                <form class="form-inline" onSubmit={this.handleSubmit}>
                    {/* Username */}
                    <label class="sr-only" for="usernameInput">Username</label>
                    <input type="name" class="form-control mb-2 mr-sm-2" id="usernameInput" placeholder="Username" value={this.state.username} onChange={this.updateUsername}></input>

                    {/* Password */}
                    <label class="sr-only" for="passwordInput">Password</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <input type="password" class="form-control" id="passwordInput" placeholder="Password" value={this.state.password} onChange={this.updatePassword}></input>
                    </div>

                    <button type="submit" class="btn btn-primary mb-2">Login</button>
                </form>
            </div>
        );
    }
}

export default UserLoginPage;
