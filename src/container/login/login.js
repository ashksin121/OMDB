import React, { Component } from 'react';

import LoginComponent from "../../component/Login/Login"

class Login extends Component{
    render(){
        return(
            <div style={{width: '100%'}}>
                <LoginComponent/>
            </div>
        )
    }
}

export default Login;