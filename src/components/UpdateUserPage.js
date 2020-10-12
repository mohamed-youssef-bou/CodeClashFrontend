import React, { Component, useRef} from "react";


export class UpdateUserPage extends Component {
    state = {
        email = '',
        username = '',
        password = ''
    }

    //Refs
    oldPasswordRef = useRef()
    newPasswordRef = useRef()
    newUsernameRef = useRef()
    passwordRef = useRef()
    changePasswordContainerRef = useRef()
    changeUsernameContainerRef = useRef()

    //need to know if user wants to update 
    //password or username
    updateUsername = false;
    
    divNoneStyle = {
        display: none
    }
    divStyle = {
        display: flex
    }

    setToUpdatePassword () {
        this.updateUsername = false;
        //CHANGE STYLE OF DIV
        changeUsernameContainerRef.current.style = this.divNoneStyle
        changePasswordContainerRef.current.style = this.divStyle
    }

    setToUpdateUsername () {
        this.updateUsername = true;
        changePasswordContainerRef.current.style = this.divNoneStyle
        changeUsernameContainerRef.current.style = this.divStyle
    }

    callAPI() {
        if(!this.updateUsername){
            oldPassword = oldPasswordRef.current
            newPassword = newPasswordRef.current
            //TODO perform put API call
        } else {
            password = passwordRef.current
            newUsername = newUsernameRef.current
            //TODO perform put API call
        }
        
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div id="container" class="container">
                <div class="buttonWrapper">
                    <button class="passwordButton" onClick={setToUpdatePassword}>Change Password</button>
                    <button class="usernameButton" onClick={setToUpdateUsername}>Change Username</button>
                </div>
                <div class="changePasswordContainer" ref={changePasswordContainerRef}>
                    <label>Old Password</label>
                    <input type='text' id='oldPasswordInput' ref={oldPasswordRef}>testing</input>
                    <label>New Password</label>
                    <input type='text' id='newPasswordInput' ref={newPasswordRef}></input>
                    <button id='passwordUpdateButton' class='updateButton'>Update</button>
                </div>
                <div class="changeUsernameContainer" ref={changeUsernameContainerRef}>
                    <label>New Username</label>
                    <input type='text' id='newUsernameInput' ref={newUsernameRef}>testing</input>
                    <label>Password</label>
                    <input type='text' id='passwordInput' ref={passwordRef}></input>
                    <button id='usernameUpdateButton' class='updateButton'>Update</button>
                </div>
            </div>
        )
    }
}