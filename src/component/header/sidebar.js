import React, { Component } from "react";

import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import StarsIcon from '@material-ui/icons/Stars';
import "./header.css"


const drawerWidth = 220;
const styles = theme => ({
  root: {
    display: "flex",
  },
  // toolbar: theme.mixins.toolbar,
  toolbar: {
    height: "61px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  btnPadding: {
    paddingTop: "0.7rem",
    paddingBottom: "0.7rem"
  },

  profileName: {
    display: "flex",
    height: "8vh",
    marginTop: "0.4rem",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});
class Sidebar extends Component {
  state = {
    menuItems: [
      {
        id: 'search',
        name: "Search",
        link: "/search",
        icon: "dashboard",
        logo: <SearchIcon style={{fontSize: "25px"}}/>
      },
      {
        id: 'nominations',
        name: "Nominations",
        link: "/nominations",
        icon: "group_add",
        logo: <StarsIcon style={{fontSize: "25px"}}/>
      }
    ],
    mobileOpen: false,
    anchorEl: null,
    open: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleLogout = () => {
    this.setState({ anchorEl: null });
    localStorage.clear();
    window.location.href = "/";
  }

  handleClick = (id) => {
    this.setState({ open: !this.state.open, id });
  }

  render() {
    const { classes, theme } = this.props;
    const { anchorEl, open } = this.state;
    const drawer = (
      <div style={{
          width: "100%",
          backgroundColor: "#2c3642",
          maxWidth: "220px",
          height: "100%"
      }}>
        <div className={classes.toolbar} >
          {/* <a href="/"><img src={smallLogo} alt="small logo" width="130px" /></a> */}
        </div>
        <Divider />
        <List className="nav-bar-menu-list" style={{padding: "0", width: "220px", paddingBottom: "20px"}}>
          {
            this.state.menuItems.map((menuItem) => (
              <div key={menuItem.id}>
                {
                  <NavLink
                    key={menuItem.id}
                    style={{ textDecoration: 'none'}}
                    to={menuItem.link}
                  >
                    <ListItem button key={menuItem.id} style={{width: "220px"}} onClick={() => {
                      if (menuItem.id == 'remove-bg'){
                        window.location.href = "/remove-bg"
                      }
                    }
                    }>
                      <ListItemIcon style={{minWidth: "40px"}}>
                        <div style={{height: "44px", display: "flex", alignItems: "center", color: "white"}}>
                          {menuItem.logo}
                        </div>
                      </ListItemIcon>
                      <ListItemText secondary={menuItem.name} secondaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: "14px", color: "#FFFFFF" } }} />
                    </ListItem>
                  </NavLink>
                }

              </div>
            ))
          }
        </List>
      </div>
    );

    return (
      <div>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.props.mobileOpenStatus}
              onClose={this.props.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}
Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    loginState: state.loginState
  }
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withStyles(styles, { withTheme: true })(Sidebar);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withStyles(styles, { withTheme: true })(Sidebar));