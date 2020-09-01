import React, { Component } from 'react';
import Appbar from "./appbar";
import Sidebar from "./sidebar";
class Header extends Component{
    render(){
        return(
            <div>
                <Appbar {...this.props} />
                <Sidebar />
            </div>
        )
    }
}

export default Header;