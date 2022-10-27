import React from "react";
import GoogleLogin from  'react-google-login'
import { withRouter } from "react-router";
 class _GoogleLoginCmp extends React.Component{
    responseGoogle=(response)=>{
        this.props.history.push('/')
    }
    render(){
        return(
            <GoogleLogin 
            clientId="506964690260-0sbda1afb0fmd0ocvdtthv20l7u43k6v.apps.googleusercontent.com"
            buttonText="login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
        )
    }
}

export const GoogleLoginCmp = withRouter(_GoogleLoginCmp)