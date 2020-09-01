import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider";

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
        height: "61px"
    }
});
class Appbar extends Component {
    state = {
        
    };

    componentWillMount() {
    }

    render() {

        const { classes } = this.props;

        return (
        <div>
            <AppBar position="fixed" className={classes.appBar} elevation={0}>
            
            <Divider />
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