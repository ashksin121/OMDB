import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider";
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 220;

const styles = theme => ({
    root: {
        display: "flex"
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`
        },
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        borderRadius: "2px",
        opacity: "1",
        height: "61px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    }
});
class Appbar extends Component {
    state = {
        
    };

    componentWillMount() {
    }

    handleSignout = () => {
        localStorage.removeItem('authToken');
        window.location = '/login';
    }

    render() {

        const { classes } = this.props;

        return (
        <div>
            <AppBar position="fixed" className={classes.appBar} elevation={0}>
            <Divider />
            <Tooltip title="Sign Out">
            <div onClick={this.handleSignout} style={{marginRight: "20px", height: "50px", width: "50px", borderRadius: "50%", backgroundColor: "#EA4D23", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}>
            <PersonIcon style={{float: "right", color: "white", fontSize: "30px"}} />
            </div>
            </Tooltip>
            </AppBar>
        </div>
        );
    }
}
Appbar.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default withStyles(styles, { withTheme: true })(Appbar);
// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Appbar));