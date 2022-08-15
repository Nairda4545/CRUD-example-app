import React from "react";
import { connect } from "react-redux"

import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '196699215225-bh4n333isbthq4q6asbrfr29ion06o7j.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: 'twatch'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }else{
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.props.authState.isSignedIn === null){
            return null
        }else if (this.props.authState.isSignedIn){
            return <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
                Sign out
            </button>
        }else{
            return <button onClick={this.onSignInClick} className="ui red google button">
            <i className="google icon" />
            Sign in with google
        </button>
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth
    }
}

export default connect( mapStateToProps, {signIn, signOut} )(GoogleAuth)