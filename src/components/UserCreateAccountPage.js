import React, { Component } from "react";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';

export class UserCreateAccountPage extends Component {

    constructor(props) {
        super(props);
        this.state= {username: '', email: '', password: '', navReady: false};
    
        this.updateUsername = this.updateUsername.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
     }

    updateUsername(event){
        this.setState({username: event.target.value});
    }
    updateEmail(event){
        this.setState({email: event.target.value});       
    }
    updatePassword(event){
        this.setState({password: event.target.value});       
    }



        handleSubmit(event) {
            event.preventDefault()
            let data = {
                'username': this.state.username,
                'email': this.state.email,
                'password': this.state.password
                  
              };

            fetch(`/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }) // Login with body parameters: username, email and password
            .then((res) => {
                if(res.status === 201){
                    this.setState({navReady: true})   
                }
                return res.json();
            })
            .catch(err => err);
        }
    


    render() {
        if (this.state.navReady) {
            return <Redirect to='/login' />
          }
        return (
            <div id="createUserForm">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    {/* Username */}
                    <label className="sr-only" htmlFor="usernameInput">Username</label>
                    <input type="name" className="form-control mb-2 mr-sm-2" id="usernameInput" placeholder="Username" value={this.state.username} onChange={this.updateUsername}></input>

                    {/* Email */}
                    <label className="sr-only" htmlFor="emailInput">Email</label>
                    <div className="input-group mb-2 mr-sm-2">
                        <input type="email" className="form-control" id="emailInput" placeholder="Email" value={this.state.email} onChange={this.updateEmail}></input>
                    </div>

                    {/* Password */}
                    <label className="sr-only" htmlFor="passwordInput">Password</label>
                    <div className="input-group mb-2 mr-sm-2">
                        <input type="password" className="form-control" id="passwordInput" placeholder="Password" value={this.state.password} onChange={this.updatePassword}></input>
                    </div>

                    <button type="submit" className="btn btn-primary mb-2">Create Account</button>

                </form>
                {/* <button type="navigate" className="btn btn-primary mb-2" onPressed={() => this.navLandingPage}>Landing Page </button> */}

            </div>

        );
    }
}
 
export default UserCreateAccountPage;
