import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import FrontScreen from './component/frontScreen/frontScreen';
import Login from './container/login/login';
import Search from './container/search/search';
import Header from './component/header/header';
import Nominations from './container/nominations/nominations'
import Signup from './container/signup/signup';
import './App.css';

require('dotenv').config();

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "220px"
    },
    height: "100vh",
    background: '#F1F1F1',
    // minHeight: 800,
    // paddingTop: 65
  }
});

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showFront: true
      }
    }

    componentDidMount() {
      // this.id  = setTimeout(() => this.setState({showFront: false}), 2000);
    }

    componentWillUnmount() {
      // clearTimeout(this.id);
    }

    render() {
      const { classes } = this.props;
      console.log(window.location.pathname)
      const authToken = localStorage.getItem('authToken');

      if(authToken) {
        return (
          <Router> 
            <Header />
            <main className={classes.content}>
                <Switch>
                  {/* <Route exact path="/login" component={Login} /> */}
                  <Route exact path="/search" component={Search} />
                  <Route exact path="/nominations" component={Nominations} />
                  <Redirect to={'/search'} />
                </Switch>
            </main>
          </Router>
        );
      } else {
        return (
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Redirect to={'/login'} />
            </Switch>
          </Router>
        );
      }
    }
}

export default withStyles(styles, { withTheme: true })(App);
