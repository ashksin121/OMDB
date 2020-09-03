import React, { Component } from 'react';

import SignupComponent from "../../component/Signup/Signup"

class Signup extends Component{
    render(){
        return(
            <div style={{width: '100%'}}>
                <SignupComponent />
            </div>
        )
    }
}

export default Signup;